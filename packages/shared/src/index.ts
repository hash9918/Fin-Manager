export const HEALTH_STATUS = ['ok', 'degraded'] as const;
export type HealthStatus = (typeof HEALTH_STATUS)[number];
