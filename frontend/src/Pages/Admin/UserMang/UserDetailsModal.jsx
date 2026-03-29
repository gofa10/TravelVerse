import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './UserManagement.module.css';

function UserDetailsModal({ isOpen, onClose, details, isLoading, error }) {
    const { t } = useTranslation();
    if (!isOpen) return null;

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent} style={{ maxWidth: '900px' }}>
                <span className={styles.close} onClick={onClose} aria-label="Close">×</span>
                <h2>{t('user_details')}</h2>

                {isLoading && <p>{t('loading')}</p>}
                {!isLoading && error && <p style={{ color: 'red' }}>{t('error_occurred')}</p>}

                {!isLoading && !error && details && (
                    <>
                        {/* ✅ Fix data path for nested API response */}
                        {(() => {
                            const payload = details?.data || details || {};
                            const user = payload.user || {};
                            const summary = payload.summary || {};
                            const reservations = payload.reservations || [];
                            const favorites = payload.favorites || [];
                            const reviews = payload.reviews || [];

                            return (
                                <>
                                    <div style={{ marginBottom: '12px' }}>
                                        <div><strong>{t('id')}:</strong> {user.id}</div>
                                        <div><strong>{t('name')}:</strong> {user.name}</div>
                                        <div><strong>{t('email')}:</strong> {user.email}</div>
                                        <div><strong>{t('role')}:</strong> {user.user_type}</div>
                                        <div><strong>{t('created_at')}:</strong> {user.created_at ? new Date(user.created_at).toLocaleString() : '—'}</div>
                                    </div>

                                    <div style={{ marginBottom: '12px' }}>
                                        <h3>{t('summary')}</h3>
                                        <div><strong>{t('favorites')}:</strong> {summary.favorites_count ?? 0}</div>
                                        <div><strong>{t('reviews')}:</strong> {summary.reviews_count ?? 0}</div>
                                        <div><strong>{t('reservations')}:</strong> {summary.reservations_count ?? 0}</div>
                                    </div>

                                    <div style={{ marginBottom: '12px' }}>
                                        <h3>{t('my_reservations')}</h3>
                                        {Array.isArray(reservations) && reservations.length > 0 ? (
                                            <div style={{ overflowX: 'auto' }}>
                                                <table className={styles.table}>
                                                    <thead>
                                                        <tr>
                                                            <th>{t('id')}</th>
                                                            <th>{t('status')}</th>
                                                            <th>{t('type')}</th>
                                                            <th>{t('item_id')}</th>
                                                            <th>{t('date')}</th>
                                                            <th>{t('people')}</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {reservations.map((r) => (
                                                            <tr key={r.id}>
                                                                <td>{r.id}</td>
                                                                <td>{r.status}</td>
                                                                <td>{r.reservable_type}</td>
                                                                <td>{r.reservable_id}</td>
                                                                <td>{r.date ?? '—'}</td>
                                                                <td>{r.people ?? '—'}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        ) : (
                                            <p>{t('no_reservations')}</p>
                                        )}
                                    </div>

                                    <div style={{ marginBottom: '12px' }}>
                                        <h3>{t('favorites')}</h3>
                                        {Array.isArray(favorites) && favorites.length > 0 ? (
                                            <div style={{ overflowX: 'auto' }}>
                                                <table className={styles.table}>
                                                    <thead>
                                                        <tr>
                                                            <th>{t('id')}</th>
                                                            <th>{t('type')}</th>
                                                            <th>{t('item_id')}</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {favorites.map((f) => (
                                                            <tr key={f.id}>
                                                                <td>{f.id}</td>
                                                                <td>{f.favoritable_type}</td>
                                                                <td>{f.favoritable_id}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        ) : (
                                            <p>{t('no_favorites')}</p>
                                        )}
                                    </div>

                                    <div>
                                        <h3>{t('reviews')}</h3>
                                        {Array.isArray(reviews) && reviews.length > 0 ? (
                                            <div style={{ overflowX: 'auto' }}>
                                                <table className={styles.table}>
                                                    <thead>
                                                        <tr>
                                                            <th>{t('id')}</th>
                                                            <th>{t('rate')}</th>
                                                            <th>{t('type')}</th>
                                                            <th>{t('item_id')}</th>
                                                            <th>{t('comment')}</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {reviews.map((rv) => (
                                                            <tr key={rv.id}>
                                                                <td>{rv.id}</td>
                                                                <td>{rv.rate}</td>
                                                                <td>{rv.reviewable_type}</td>
                                                                <td>{rv.reviewable_id}</td>
                                                                <td style={{ maxWidth: '360px' }}>{rv.comment ?? '—'}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        ) : (
                                            <p>{t('no_reviews')}</p>
                                        )}
                                    </div>
                                </>
                            );
                        })()}
                    </>
                )}
            </div>
        </div>
    );
}

export default UserDetailsModal;
