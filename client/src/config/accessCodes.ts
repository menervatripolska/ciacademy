// Коды доступа к Crypto OS Dashboard.
// Единый источник правды — этот файл.
// Зеркалируются в:
//  - server/index.ts (VALID_CODES, серверная валидация /api/validate-code)
//  - client/src/pages/AccessCode.tsx (fallback-страница /access)
// При изменении списка — синхронизировать все три места.

export const ACCESS_CODES: string[] = [
  "OS-ALPHA-2026",   // основной альфа-код первого потока
  "SATS-READY",      // гости/приглашённые
  "NOIR-ACCESS",     // визуальный доступ (для демо)
  "BTC-REGIME",      // тестировщики макро-модели
  "CRYPTO-OS-MVP",   // технический код для внутренних проверок
  // Старые коды — оставлены для обратной совместимости
  "CRYPTO-2026-001",
  "CRYPTO-2026-002",
  "CRYPTO-2026-003",
  "TEST-ACCESS",
];

export function isValidAccessCode(raw: string): boolean {
  if (!raw) return false;
  const code = raw.trim().toUpperCase();
  return ACCESS_CODES.includes(code);
}

export const ACCESS_LS_KEY = "cryptoos_access";
export const ACCESS_CODE_LS_KEY = "cryptoos_code";
