import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Check, Map, Plus } from 'lucide-react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import LoginPromptModal from '../../Utility/LoginPromptModal';
import TripBuilderModal from './TripBuilderModal';
import {
  addItemToPlan,
  fetchPlans,
  selectAllPlans,
  selectTripBuilderBlocked,
  selectIsInAnyPlan,
  selectItemLoading,
} from '../../store/tripBuilderSlice';
import { hasValidToken } from '../../Utility/authToken';

const supportedTypes = new Set(['Trip', 'Hotel', 'Restaurant']);

export default function TripPlanMenuButton({
  serviceId,
  serviceType,
  className = '',
  buttonLabel,
  compact = false,
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const plans = useSelector(selectAllPlans);
  const itemLoading = useSelector(selectItemLoading);
  const tripBuilderBlocked = useSelector(selectTripBuilderBlocked);
  const { user, loading: authLoading } = useSelector((state) => state.auth);
  const isInAnyPlan = useSelector(selectIsInAnyPlan(serviceId, serviceType));
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [promptOpen, setPromptOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0, width: 256 });

  const hasToken = hasValidToken();
  const isAuthenticated = hasToken && Boolean(user);
  const canUseTripPlans = user?.user_type === 'user';
  const isSupported = supportedTypes.has(serviceType);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const updateMenuPosition = () => {
      if (!buttonRef.current) {
        return;
      }

      const rect = buttonRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + 8,
        left: Math.max(16, rect.right - 256),
        width: 256,
      });
    };

    updateMenuPosition();

    const handleOutsideClick = (event) => {
      if (
        (dropdownRef.current && dropdownRef.current.contains(event.target)) ||
        (buttonRef.current && buttonRef.current.contains(event.target))
      ) {
        return;
      }
      setOpen(false);
    };

    document.addEventListener('mousedown', handleOutsideClick);
    window.addEventListener('resize', updateMenuPosition);
    window.addEventListener('scroll', updateMenuPosition, true);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      window.removeEventListener('resize', updateMenuPosition);
      window.removeEventListener('scroll', updateMenuPosition, true);
    };
  }, [open]);

  if (!isSupported) {
    return null;
  }

  if (authLoading && hasToken && !user) {
    return null;
  }

  if (user && !canUseTripPlans) {
    return null;
  }

  const payloadForPlan = (planId) => ({
    planId,
    data: {
      plannable_id: serviceId,
      plannable_type: serviceType,
      day_number: null,
      planned_date: null,
      notes: '',
    },
  });

  const handleToggle = async (event) => {
    event?.preventDefault?.();
    event?.stopPropagation?.();

    if (!hasToken) {
      setPromptOpen(true);
      return;
    }

    if (!canUseTripPlans || tripBuilderBlocked) {
      return;
    }

    if (!plans.length) {
      try {
        await dispatch(fetchPlans()).unwrap();
      } catch {
        return;
      }
    }

    setOpen((prev) => !prev);
  };

  const handleAddToPlan = async (plan) => {
    try {
      await dispatch(addItemToPlan(payloadForPlan(plan.id))).unwrap();
      toast.success(`Added to ${plan.name}!`);
      setOpen(false);
    } catch (error) {
      toast.error(error || t('error_occurred'));
    }
  };

  const handleNewTripSuccess = async (newPlan) => {
    try {
      await dispatch(addItemToPlan(payloadForPlan(newPlan.id))).unwrap();
      toast.success(`Added to ${newPlan.name}!`);
    } catch (error) {
      toast.error(error || t('error_occurred'));
    } finally {
      setOpen(false);
    }
  };

  return (
    <>
      <LoginPromptModal
        open={promptOpen}
        onClose={() => setPromptOpen(false)}
        onGoLogin={() => {
          setPromptOpen(false);
          navigate('/login');
        }}
        type="trip"
      />

      <TripBuilderModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={handleNewTripSuccess}
      />

      <div
        className={`relative ${compact ? 'inline-flex' : 'flex'} ${className}`}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
        }}
      >
        <button
          ref={buttonRef}
          type="button"
          title={t('add_to_trip')}
          disabled={itemLoading}
          onClick={handleToggle}
          className={`inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white/90 px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-600 dark:bg-slate-900/90 dark:text-slate-200 dark:hover:bg-slate-800 ${
            compact ? 'min-h-9' : ''
          }`}
        >
          {isInAnyPlan ? <Check size={16} className="text-emerald-500" /> : <Map size={16} />}
          <span>{buttonLabel || t('add_to_trip')}</span>
          <span className="text-xs">▼</span>
        </button>
      </div>

      {createPortal(
        <div
          ref={dropdownRef}
          className={`fixed z-[10050] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl transition ${
            open ? 'pointer-events-auto opacity-100 translate-y-0' : 'pointer-events-none opacity-0 -translate-y-1'
          } dark:border-slate-700 dark:bg-slate-900`}
          style={{
            top: `${menuPosition.top}px`,
            left: `${menuPosition.left}px`,
            width: `${menuPosition.width}px`,
          }}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
          }}
        >
          <div className="max-h-72 overflow-y-auto py-2">
            {plans.length ? (
              plans.map((plan) => (
                <button
                  key={plan.id}
                  type="button"
                  disabled={itemLoading}
                  onClick={() => handleAddToPlan(plan)}
                  className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  <div>
                    <p className="font-semibold">{plan.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{plan.destination}</p>
                  </div>
                  <span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-300">
                    {plan.items_count ?? plan.items?.length ?? 0}
                  </span>
                </button>
              ))
            ) : (
              <div className="px-4 py-3 text-sm text-slate-500 dark:text-slate-400">{t('no_results')}</div>
            )}

            <div className="my-2 border-t border-slate-200 dark:border-slate-700" />

            <button
              type="button"
              disabled={itemLoading}
              onClick={() => {
                setModalOpen(true);
                setOpen(false);
              }}
              className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm font-semibold text-sky-600 transition hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-60 dark:text-sky-300 dark:hover:bg-sky-950/30"
            >
              <Plus size={16} />
              + {t('new_trip')}
            </button>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
