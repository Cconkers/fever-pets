import { Pet, HealthTier, PetWithHealth } from "../models/pet.models";

export interface HealthStrategy {
  compute(pet: Pet): HealthTier;
}

export class DefaultHealthStrategy implements HealthStrategy {
  compute(pet: Pet): HealthTier {
    const score = pet.weight / (pet.height * pet.length);
    if (score < 2 || score > 5) return 'unhealthy';
    if (score < 3) return 'very healthy';
    return 'healthy';
  }
}

export class CatHealthStrategy extends DefaultHealthStrategy {
  override compute(pet: Pet): HealthTier {
    if (pet.number_of_lives === 1) return 'unhealthy';
    return super.compute(pet);
  }
}

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


  private static readonly HEALTH_CLASS_MAP: Record<HealthTier, string> = {
    healthy: 'health--good',
    'very healthy': 'health--very-good',
    unhealthy: 'health--bad',
  };

  static getPetHealthClass(healthTier: HealthTier): string {
    return HealthCalculator.HEALTH_CLASS_MAP[healthTier] ?? '';
  }

}
