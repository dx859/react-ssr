export function util() {

  return {
    setTenantCode: t => (tenant = t),
    getTenantCode: () => tenant
  };
}