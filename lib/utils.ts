type ClassValue = string | number | boolean | undefined | null | { [key: string]: any } | ClassValue[];

function toClassArray(value: ClassValue): string[] {
  if (typeof value === 'string' || typeof value === 'number') {
    return [value.toString()];
  }
  
  if (!value) {
    return [];
  }
  
  if (Array.isArray(value)) {
    return value.flatMap(toClassArray);
  }
  
  if (typeof value === 'object') {
    return Object.entries(value)
      .filter(([, condition]) => Boolean(condition))
      .map(([className]) => className);
  }
  
  return [];
}

/**
 * Combines class names into a single string
 * Filters out falsy values and handles conditional classes
 * @param inputs - Class names to combine
 * @returns Combined class string
 */
export function cn(...inputs: ClassValue[]): string {
  return inputs.flatMap(toClassArray).filter(Boolean).join(' ');
}
