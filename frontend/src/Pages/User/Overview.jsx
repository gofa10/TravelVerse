import React, { useState, useEffect } from 'react';
import api from '../../Radux/axios';
import { Calendar, Heart, Star, BoxSelect, Inbox } from 'lucide-react';

const Overview = () => {
     const [stats, setStats] = useState({
          reservations: 0,
          favorites: 0,
          reviews: 0,
     });
     const [recentReservations, setRecentReservations] = useState([]);
     const [loading, setLoading] = useState(true);

     useEffect(() => {
          const fetchStats = async () => {
               try {
                    const [resReservations, resFavorites, resReviews] = await Promise.all([
                         api.get('/reservations').catch(() => ({ data: [] })),
                         api.get('/favorites').catch(() => ({ data: [] })),
                         api.get('/reviews').catch(() => ({ data: [] })), // Assuming this endpoint exists based on prompt
                    ]);

                    const reservationsData = resReservations.data || [];
                    const favoritesData = resFavorites.data || [];
                    const reviewsData = resReviews.data || [];

                    setStats({
                         reservations: reservationsData.length || 0,
                         favorites: favoritesData.length || 0,
                         reviews: reviewsData.length || 0,
                    });

                    // Mapping to match recent reservations mini-table structure
                    const formattedRecent = reservationsData.slice(0, 3).map((r) => {
                         const source = r.reservable || r.favoritable || {};
                         const title =
                              source.name_en ||
                              source.name ||
                              source.title ||
                              (source.from_location && source.to_location
                                   ? `${source.from_location} \u2192 ${source.to_location}`
                                   : null) ||
                              'Item';
                         const modelToTypeMap = {
                              'App\\Models\\Trip': 'trip',
                              'App\\Models\\Hotel': 'hotel',
                              'App\\Models\\Restaurant': 'restaurant',
                              'App\\Models\\Activity': 'activity',
                              'App\\Models\\Cruise': 'cruise',
                              'App\\Models\\Car': 'car',
                              'App\\Models\\Flight': 'flight',
                         };
                         const model = r.reservable_type || r.favoritable_type;
                         const typeName = modelToTypeMap[model] || 'trip';

                         const rawImages = source.images;
                         const image =
                              Array.isArray(rawImages) && rawImages.length > 0
                                   ? (typeof rawImages[0] === 'string'
                                        ? rawImages[0]
                                        : rawImages[0]?.url || rawImages[0]?.image || rawImages[0]?.path)
                                   : source.image || source.thumbnail || null;

                         return {
                              id: r.id,
                              image,
                              title,
                              type: typeName,
                              status: r.status,
                              date: new Date(r.created_at || Date.now()).toLocaleDateString(),
                         };
                    });

                    setRecentReservations(formattedRecent);
               } catch (error) {
                    console.error('Failed to fetch dashboard stats', error);
               } finally {
                    setLoading(false);
               }
          };

          fetchStats();
     }, []);

     return (
          <div className="space-y-6">
               <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Overview</h2>

               {/* STATS CARDS */}
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {loading ? (
                         [1, 2, 3].map((i) => (
                              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 animate-pulse flex items-center space-x-4">
                                   <div className="rounded-full bg-gray-200 dark:bg-gray-700 h-12 w-12"></div>
                                   <div className="flex-1 space-y-2">
                                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                                        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                                   </div>
                              </div>
                         ))
                    ) : (
                         <>
                              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 flex items-center gap-4 border border-gray-100 dark:border-gray-700">
                                   <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
                                        <Calendar size={28} />
                                   </div>
                                   <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Total Reservations</p>
                                        <p className="text-2xl font-bold text-gray-800 dark:text-white">{stats.reservations}</p>
                                   </div>
                              </div>

                              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 flex items-center gap-4 border border-gray-100 dark:border-gray-700">
                                   <div className="bg-red-100 text-red-600 p-3 rounded-full">
                                        <Heart size={28} />
                                   </div>
                                   <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Saved Favorites</p>
                                        <p className="text-2xl font-bold text-gray-800 dark:text-white">{stats.favorites}</p>
                                   </div>
                              </div>

                              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 flex items-center gap-4 border border-gray-100 dark:border-gray-700">
                                   <div className="bg-yellow-100 text-yellow-600 p-3 rounded-full">
                                        <Star size={28} />
                                   </div>
                                   <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Total Reviews</p>
                                        <p className="text-2xl font-bold text-gray-800 dark:text-white">{stats.reviews}</p>
                                   </div>
                              </div>
                         </>
                    )}
               </div>

               {/* RECENT RESERVATIONS */}
               <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mt-8 border border-gray-100 dark:border-gray-700">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Recent Reservations</h3>

                    {loading ? (
                         <div className="animate-pulse space-y-4">
                              {[1, 2, 3].map((i) => (
                                   <div key={i} className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
                              ))}
                         </div>
                    ) : recentReservations.length === 0 ? (
                         <div className="flex flex-col items-center justify-center py-10 text-gray-500 dark:text-gray-400">
                              <Inbox size={48} className="mb-3 text-gray-300 dark:text-gray-600" />
                              <p>No reservations yet 🌍</p>
                         </div>
                    ) : (
                         <div className="overflow-x-auto">
                              <table className="w-full text-left border-collapse">
                                   <thead>
                                        <tr className="border-b border-gray-100 dark:border-gray-700 text-gray-500 dark:text-gray-400 text-sm">
                                             <th className="pb-3 font-medium">Item Name</th>
                                             <th className="pb-3 font-medium">Type</th>
                                             <th className="pb-3 font-medium">Status</th>
                                             <th className="pb-3 font-medium">Date</th>
                                        </tr>
                                   </thead>
                                   <tbody>
                                        {recentReservations.map((res) => (
                                             <tr key={res.id} className="border-b last:border-0 border-gray-50 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                                                  <td className="py-3 flex items-center gap-3">
                                                       {res.image
                                                            ? <img src={res.image} alt={res.title} className="w-10 h-10 rounded-md object-cover" />
                                                            : <div className="w-10 h-10 rounded-md bg-gray-200 flex items-center justify-center text-gray-400 text-xs">📷</div>
                                                       }
                                                       <span className="font-medium text-gray-800 dark:text-white">{res.title}</span>
                                                  </td>
                                                  <td className="py-3 capitalize text-gray-600 dark:text-gray-300">{res.type}</td>
                                                  <td className="py-3">
                                                       <span className={`px-2 py-1 rounded-full text-xs font-medium ${res.status === 'accepted' || res.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                                                            res.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                                                 res.status === 'rejected' || res.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                                                                      'bg-gray-100 text-gray-600'
                                                            }`}>
                                                            {res.status}
                                                       </span>
                                                  </td>
                                                  <td className="py-3 text-gray-600 dark:text-gray-300">{res.date}</td>
                                             </tr>
                                        ))}
                                   </tbody>
                              </table>
                         </div>
                    )}
               </div>
          </div>
     );
};

export default Overview;
