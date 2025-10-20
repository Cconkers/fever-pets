import { Pet, HealthTier, PetWithHealth } from "../models/pet.models";


/**
 * Interface para el c�lculo de salud de cualquier tipo de mascota.
 * Permite extender la l�gica f�cilmente si aparecen nuevos tipos (birds, reptiles...).
 */
export interface HealthStrategy {
  compute(pet: Pet): HealthTier;
}

/**
 * Estrategia general para perros u otros animales sin reglas especiales.
 */
export class DefaultHealthStrategy implements HealthStrategy {
  compute(pet: Pet): HealthTier {
    const score = pet.weight / (pet.height * pet.length);
    if (score < 2 || score > 5) return 'unhealthy';
    if (score < 3) return 'very healthy';
    return 'healthy';
  }
}

/**
 * Estrategia espec�fica para gatos (con regla de �vidas�).
 */
export class CatHealthStrategy extends DefaultHealthStrategy {
  override compute(pet: Pet): HealthTier {
    if (pet.number_of_lives === 1) return 'unhealthy';
    return super.compute(pet);
  }
}

/**
 * Factory que decide qu� estrategia usar seg�n el tipo de pet.
 */
export class HealthCalculator {
  private static getStrategy(pet: Pet): HealthStrategy {
    switch (pet.kind) {
      case 'cat': return new CatHealthStrategy();
      default: return new DefaultHealthStrategy();
    }
  }

  static withHealth(pet: Pet): PetWithHealth {
    const healthScore = pet.weight / (pet.height * pet.length);
    const tier = this.getStrategy(pet).compute(pet);
    return { ...pet, healthScore, healthTier: tier };
  }
}
