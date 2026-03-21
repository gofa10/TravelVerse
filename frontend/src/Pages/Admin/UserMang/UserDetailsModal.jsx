import React from 'react';
import styles from './UserManagement.module.css';

function UserDetailsModal({ isOpen, onClose, details, isLoading, error }) {
    if (!isOpen) return null;

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent} style={{ maxWidth: '900px' }}>
                <span className={styles.close} onClick={onClose} aria-label="Close">×</span>
                <h2>User Details</h2>

                {isLoading && <p>Loading...</p>}
                {!isLoading && error && <p style={{ color: 'red' }}>Failed to load user details.</p>}

                {!isLoading && !error && details && (
                    <>
                        <div style={{ marginBottom: '12px' }}>
                            <div><strong>ID:</strong> {details.user?.id}</div>
                            <div><strong>Name:</strong> {details.user?.name}</div>
                            <div><strong>Email:</strong> {details.user?.email}</div>
                            <div><strong>Role:</strong> {details.user?.user_type}</div>
                            <div><strong>Created At:</strong> {details.user?.created_at ? new Date(details.user.created_at).toLocaleString() : '—'}</div>
                        </div>

                        <div style={{ marginBottom: '12px' }}>
                            <h3>Summary</h3>
                            <div><strong>Favorites:</strong> {details.summary?.favorites_count ?? 0}</div>
                            <div><strong>Reviews:</strong> {details.summary?.reviews_count ?? 0}</div>
                            <div><strong>Reservations:</strong> {details.summary?.reservations_count ?? 0}</div>
                        </div>

                        <div style={{ marginBottom: '12px' }}>
                            <h3>Reservations</h3>
                            {Array.isArray(details.reservations) && details.reservations.length > 0 ? (
                                <div style={{ overflowX: 'auto' }}>
                                    <table className={styles.table}>
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Status</th>
                                                <th>Type</th>
                                                <th>Item ID</th>
                                                <th>Date</th>
                                                <th>People</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {details.reservations.map((r) => (
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
                                <p>No reservations.</p>
                            )}
                        </div>

                        <div style={{ marginBottom: '12px' }}>
                            <h3>Favorites</h3>
                            {Array.isArray(details.favorites) && details.favorites.length > 0 ? (
                                <div style={{ overflowX: 'auto' }}>
                                    <table className={styles.table}>
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Type</th>
                                                <th>Item ID</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {details.favorites.map((f) => (
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
                                <p>No favorites.</p>
                            )}
                        </div>

                        <div>
                            <h3>Reviews</h3>
                            {Array.isArray(details.reviews) && details.reviews.length > 0 ? (
                                <div style={{ overflowX: 'auto' }}>
                                    <table className={styles.table}>
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Rate</th>
                                                <th>Type</th>
                                                <th>Item ID</th>
                                                <th>Comment</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {details.reviews.map((rv) => (
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
                                <p>No reviews.</p>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default UserDetailsModal;
