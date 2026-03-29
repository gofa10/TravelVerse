import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Form, InputGroup, Button, Pagination } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import api from '../../Radux/axios';
import SkeletonGrid from '../../Utility/Skeletons/SkeletonGrid';
import EmptyState from '../../Component/Shared/EmptyState';

/**
 * Reusable Listing Page Component
 * @param {string} title - Page title
 * @param {string} endpoint - API endpoint to fetch from
 * @param {React.Component} CardComponent - Component to render for each item
 * @param {string} type - Item type (hotel, car, cruise, activity)
 * @param {string} icon - Emoji or icon for the title
 */
const ListingPage = ({ title, endpoint, CardComponent, type, icon = '📍', layout = 'list' }) => {
  const { t } = useTranslation();
  
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [sort, setSort] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [lastPage, setLastPage] = useState(1);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // Reset to first page on search
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get(endpoint, {
        params: {
          search: debouncedSearch,
          sort,
          min_price: minPrice,
          max_price: maxPrice,
          page,
          per_page: 12
        }
      });
      
      // Standardize response extraction based on Task I1 backend changes
      const data = response?.data?.data;
      setItems(data?.items || []);
      setTotal(data?.total || 0);
      setLastPage(data?.last_page || 1);
    } catch (error) {
      console.error('Error fetching data:', error);
      setItems([]);
      setTotal(0);
      setLastPage(1);
    } finally {
      setLoading(false);
    }
  }, [endpoint, debouncedSearch, sort, minPrice, maxPrice, page]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleFilterChange = (setter) => (e) => {
    setter(e.target.value);
    setPage(1);
  };

  const handleClear = () => {
    setSearch('');
    setSort('');
    setMinPrice('');
    setMaxPrice('');
    setPage(1);
  };

  return (
    <div className="listing-page-wrapper bg-light py-5" style={{ minHeight: '100vh' }}>
      <Container>
        {/* Header Section */}
        <div className="d-flex align-items-center gap-3 mb-5">
          <div 
            className="d-flex align-items-center justify-content-center rounded-circle bg-white shadow-sm"
            style={{ width: '64px', height: '64px', fontSize: '2rem' }}
          >
            {icon}
          </div>
          <div>
            <h1 className="h2 fw-bold text-gray-900 mb-1">{title}</h1>
            <p className="text-muted mb-0">{t('listing.showing')} {items.length} {t('listing.of')} {total} {t('listing.results')}</p>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white p-4 rounded-4 shadow-sm mb-5 border">
          <Row className="g-3">
            <Col lg={4}>
              <Form.Group>
                <Form.Label className="small fw-bold text-muted text-uppercase mb-2" style={{ letterSpacing: '0.05em' }}>
                  {t('listing.search')}
                </Form.Label>
                <InputGroup className="bg-light border-0 rounded-3">
                  <InputGroup.Text className="bg-transparent border-0 pe-0 opacity-50">
                    🔍
                  </InputGroup.Text>
                  <Form.Control
                    className="bg-transparent border-0 py-2 shadow-none"
                    placeholder={t('listing.search')}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>
            </Col>

            <Col sm={6} lg={2}>
              <Form.Group>
                <Form.Label className="small fw-bold text-muted text-uppercase mb-2" style={{ letterSpacing: '0.05em' }}>
                  {t('listing.sortBy')}
                </Form.Label>
                <Form.Select 
                  className="bg-light border-0 py-2 rounded-3 shadow-none fw-medium"
                  value={sort} 
                  onChange={handleFilterChange(setSort)}
                >
                  <option value="">{t('listing.sortBy')}</option>
                  <option value="price_asc">{t('listing.priceAsc')}</option>
                  <option value="price_desc">{t('listing.priceDesc')}</option>
                  <option value="rating">{t('listing.topRated')}</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col sm={3} lg={2}>
              <Form.Group>
                <Form.Label className="small fw-bold text-muted text-uppercase mb-2" style={{ letterSpacing: '0.05em' }}>
                  {t('listing.minPrice')}
                </Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Min"
                  className="bg-light border-0 py-2 rounded-3 shadow-none"
                  value={minPrice}
                  onChange={handleFilterChange(setMinPrice)}
                />
              </Form.Group>
            </Col>

            <Col sm={3} lg={2}>
              <Form.Group>
                <Form.Label className="small fw-bold text-muted text-uppercase mb-2" style={{ letterSpacing: '0.05em' }}>
                  {t('listing.maxPrice')}
                </Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Max"
                  className="bg-light border-0 py-2 rounded-3 shadow-none"
                  value={maxPrice}
                  onChange={handleFilterChange(setMaxPrice)}
                />
              </Form.Group>
            </Col>

            <Col lg={2} className="d-flex align-items-end">
              <Button
                variant="light"
                className="w-100 py-2 rounded-3 fw-semibold text-muted border"
                onClick={handleClear}
              >
                {t('clear_filters') || 'Clear'}
              </Button>
            </Col>
          </Row>
        </div>

        {/* Results Section */}
        <div className="results-container">
          {loading ? (
            <SkeletonGrid count={layout === 'grid' ? 8 : 6} lg={layout === 'grid' ? 3 : 12} />
          ) : items.length > 0 ? (
            <>
              <div className={layout === 'grid' ? "row g-4" : "d-flex flex-column gap-4"}>
                {items.map(item => (
                  layout === 'grid' ? (
                    <Col key={item.id} xs={12} sm={6} lg={4} xl={3}>
                      <CardComponent 
                        data={item} 
                        product={item} 
                        cruise={item} 
                        type={type}
                      />
                    </Col>
                  ) : (
                    <CardComponent 
                      key={item.id} 
                      data={item} 
                      product={item} 
                      cruise={item} 
                      type={type}
                    />
                  )
                ))}
              </div>
              
              {lastPage > 1 && (
                <div className="d-flex justify-content-center mt-5">
                  <Pagination className="pagination-premium shadow-sm rounded-3 overflow-hidden">
                    <Pagination.Prev 
                       disabled={page === 1} 
                       onClick={() => {
                         setPage(page - 1);
                         window.scrollTo(0, 0);
                       }}
                    />
                    
                    {[...Array(lastPage).keys()].map(num => (
                      <Pagination.Item 
                        key={num + 1} 
                        active={page === num + 1}
                        onClick={() => {
                          setPage(num + 1);
                          window.scrollTo(0, 0);
                        }}
                      >
                        {num + 1}
                      </Pagination.Item>
                    ))}

                    <Pagination.Next 
                       disabled={page === lastPage}
                       onClick={() => {
                         setPage(page + 1);
                         window.scrollTo(0, 0);
                       }}
                    />
                  </Pagination>
                </div>
              )}
            </>
          ) : (
            <div className="bg-white rounded-4 shadow-sm border py-5">
              <EmptyState 
                title={t('listing.noResults')} 
                subtitle={t('search_no_results_desc') || 'Try adjusting your filters to find what you are looking for.'}
              />
            </div>
          )}
        </div>
      </Container>
      
      <style>{`
        .pagination-premium .page-link {
          border: none;
          color: #6c757d;
          padding: 0.75rem 1rem;
          font-weight: 600;
        }
        .pagination-premium .page-item.active .page-link {
          background-color: var(--color-primary, #007bff);
          color: white;
        }
        .pagination-premium .page-item:not(.active):hover .page-link {
          background-color: #f8f9fa;
        }
        .text-gray-900 { color: #111827; }
        .text-gray-800 { color: #1f2937; }
      `}</style>
    </div>
  );
};

export default ListingPage;
