# TransitOps API Integration Status

## ✅ Integrated (Backend ↔ Frontend)

### Auth
| Endpoint | Method | Status | Frontend Service |
|----------|--------|--------|-----------------|
| `/auth/login` | POST | ✅ Integrated | `auth.service.ts` — login() |
| `/auth/register` | POST | ❗ Backend only | Not used in UI (no register page) |
| `/me` | GET | ✅ Added | `auth.service.ts` — getCurrentUser() |

### Dashboard
| Endpoint | Method | Status | Frontend Service |
|----------|--------|--------|-----------------|
| `/dashboard/summary` | GET | ✅ Integrated | `dashboard.service.ts` — fetches stats |
| `/dashboard/vehicle-status` | GET | ✅ Integrated | Transformed to vehicleStatus[] |
| `/dashboard/trip-status` | GET | ✅ Skipped | Replaced by actual `/trips` data for recent trips |
| `/dashboard/expenses` | GET | ❗ Available | Not used directly (expenses page uses `/expenses` instead) |
| `/dashboard/fuel` | GET | ❗ Available | Not used directly (fuel page uses `/fuel-logs` instead) |

### Fleet (Vehicles)
| Endpoint | Method | Status | Frontend Service |
|----------|--------|--------|-----------------|
| `/vehicles` | GET | ✅ Integrated | `fleet.service.ts` — fetchVehicles() |
| `/vehicles/:id` | GET | ❗ Backend only | Not used in UI |
| `/vehicles` | POST | ❗ Backend only | No create vehicle form in UI |
| `/vehicles/:id` | PATCH | ❗ Backend only | No edit vehicle UI |
| `/vehicles/:id` | DELETE | ❗ Backend only | No delete vehicle UI |
| `/vehicles/:id/status` | PATCH | ❗ Backend only | No status toggle UI |

### Drivers
| Endpoint | Method | Status | Frontend Service |
|----------|--------|--------|-----------------|
| `/drivers` | GET | ✅ Integrated | `drivers.service.ts` — fetchDrivers() |
| `/drivers/:id` | GET | ❗ Backend only | Not used in UI |
| `/drivers` | POST | ❗ Backend only | No create driver form in UI |
| `/drivers/:id` | PATCH | ❗ Backend only | No edit driver UI |
| `/drivers/:id` | DELETE | ❗ Backend only | No delete driver UI |
| `/drivers/:id/status` | PATCH | ❗ Backend only | `DriverStatusToggles` component exists but not wired |

### Trips
| Endpoint | Method | Status | Frontend Service |
|----------|--------|--------|-----------------|
| `/trips` | GET | ✅ **NEW** | `trips.service.ts` — fetchTrips() |
| `/trips/:id` | GET | ✅ **NEW** | `trips.service.ts` — getTripById() |
| `/trips` | POST | ✅ Integrated | `trips.service.ts` — createTrip() (resolves vehicle/driver reg → ID) |
| `/trips/:id/status` | PATCH | ✅ **NEW** | `trips.service.ts` — updateTripStatus() + `useUpdateTripStatus` hook |

### Maintenance
| Endpoint | Method | Status | Frontend Service |
|----------|--------|--------|-----------------|
| `/maintenance` | GET | ✅ Integrated | `maintenance.service.ts` — fetchServiceRecords() |
| `/maintenance/:id` | GET | ❗ Backend only | Not used in UI |
| `/maintenance` | POST | ✅ Integrated | `maintenance.service.ts` — createServiceRecord() (resolves vehicle reg → ID) |
| `/maintenance/:id` | PATCH | ❗ Backend only | No edit maintenance UI |
| `/maintenance/:id` | DELETE | ✅ Integrated | `maintenance.service.ts` — deleteServiceRecord() + `useDeleteServiceRecord` hook |
| `/maintenance/:id/complete` | PATCH | ✅ Integrated | `maintenance.service.ts` — completeServiceRecord() + `useCompleteServiceRecord` hook |

### Fuel Logs
| Endpoint | Method | Status | Frontend Service |
|----------|--------|--------|-----------------|
| `/fuel-logs` | GET | ✅ Integrated | `fuel-expenses.service.ts` — fetchFuelLogs() |
| `/fuel-logs/:id` | GET | ❗ Backend only | Not used in UI |
| `/fuel-logs` | POST | ❗ Backend only | No create fuel log form in UI |
| `/fuel-logs/:id` | PATCH | ❗ Backend only | No edit fuel log UI |
| `/fuel-logs/:id` | DELETE | ❗ Backend only | No delete fuel log UI |

### Expenses
| Endpoint | Method | Status | Frontend Service |
|----------|--------|--------|-----------------|
| `/expenses` | GET | ✅ Integrated | `fuel-expenses.service.ts` — fetchOtherExpenses() |
| `/expenses/:id` | GET | ❗ Backend only | Not used in UI |
| `/expenses` | POST | ❗ Backend only | No create expense form in UI |
| `/expenses/:id` | PATCH | ❗ Backend only | No edit expense UI |
| `/expenses/:id` | DELETE | ❗ Backend only | No delete expense UI |

### Analytics
| Endpoint | Method | Status | Frontend Service |
|----------|--------|--------|-----------------|
| `/analytics` | GET | ✅ **NEW** | `analytics.service.ts` — fetchAnalyticsData() |

---

## 🆕 New Backend Files Created

| File | Purpose |
|------|---------|
| `backend/src/services/analytics.service.ts` | Computes analytics (fuel efficiency, utilization, ROI, monthly revenue, costliest vehicles) |
| `backend/src/controllers/analytics.controller.ts` | Handler for GET /analytics |
| `backend/src/routes/analytics.routes.ts` | Route registration for analytics |
| `backend/prisma/migrations/20260712091319_add_source_destination_to_trip/migration.sql` | Migration: adds `source` and `destination` columns to Trip table |

## 🔧 Backend Files Modified

| File | Changes |
|------|---------|
| `backend/prisma/schema.prisma` | Added `source` (String) and `destination` (String) fields to Trip model |
| `backend/src/types/index.ts` | Updated `TripStatusEnum` to include `DRAFT` and `DISPATCHED` |
| `backend/src/validators/trip.validator.ts` | Added `source`, `destination` to createTripSchema; added `updateTripStatusSchema` |
| `backend/src/services/trip.service.ts` | Added `getAllTrips()`, `getTripById()`, `updateTripStatus()`; uses `AppError`; auto-updates vehicle/driver status |
| `backend/src/controllers/trip.controller.ts` | Added handlers for getAllTrips, getTripById, updateTripStatus |
| `backend/src/routes/trip.routes.ts` | Added GET /, GET /:id, PATCH /:id/status |
| `backend/src/routes/index.ts` | Added analyticsRouter import and route |

## 🔧 Frontend Files Modified

| File | Changes |
|------|---------|
| `frontend/src/modules/auth/services/auth.service.ts` | Real API call for login; added `getCurrentUser()`; converts `user.id` from number → string |
| `frontend/src/modules/dashboard/services/dashboard.service.ts` | Real API calls to /dashboard/summary, /dashboard/vehicle-status, /trips; mock data fallback for recent trips |
| `frontend/src/modules/drivers/services/drivers.service.ts` | Real API call to /drivers; transforms backend data to frontend Driver type |
| `frontend/src/modules/fleet/services/fleet.service.ts` | Real API call to /vehicles; transforms backend data to frontend Vehicle type with computed avgCost |
| `frontend/src/modules/trips/services/trips.service.ts` | Real API calls to /trips (GET/POST); resolves vehicle/driver strings → numeric IDs; added `updateTripStatus()` |
| `frontend/src/modules/trips/hooks/useTrips.ts` | Added `useUpdateTripStatus` mutation hook |
| `frontend/src/modules/maintenance/services/maintenance.service.ts` | Real API calls to /maintenance (GET/POST); resolves vehicle string → ID; added `completeServiceRecord()`, `deleteServiceRecord()` |
| `frontend/src/modules/maintenance/hooks/useMaintenance.ts` | Added `useCompleteServiceRecord`, `useDeleteServiceRecord` mutation hooks |
| `frontend/src/modules/fuel-expenses/services/fuel-expenses.service.ts` | Real API calls to /fuel-logs and /expenses; transforms to frontend FuelLog/OtherExpense types |
| `frontend/src/modules/analytics/services/analytics.service.ts` | Real API call to /analytics |

---

## 📋 Prerequisites for Running

1. **Database migration**: Run `cd backend && npx prisma migrate dev` to apply the new migration (adds `source`/`destination` to Trip table)
2. **Regenerate Prisma client**: `cd backend && npx prisma generate`
3. **Start backend**: `cd backend && npm run dev` (or `npm start`)
4. **Start frontend**: `cd frontend && npm run dev`

## 🚧 Known Limitations

1. **Trip form uses hardcoded vehicles/drivers** — `create-trip-form.tsx` has hardcoded vehicle and driver dropdown options. For a fully dynamic experience, it should fetch available vehicles and drivers from the API.
2. **Maintenance form uses hardcoded vehicles** — Same issue as above.
3. **Odometer data is estimated** — The backend doesn't store odometer readings, so fleet page shows estimated values.
4. **Analytics revenue is estimated** — Revenue is calculated as `completedTrips * ₹2000` since the app doesn't track actual revenue.
5. **Driver category is derived** — Derived from license number prefix since the backend doesn't have a category field.
6. **No create forms for vehicles, drivers, fuel logs, or expenses** — The backend has POST endpoints but no UI forms exist yet.
7. **No edit/delete operations wired in UI** — The backend supports PATCH/DELETE but the UI doesn't have edit buttons or delete confirmations.
