import { getTeamScore, Dice } from "./coba";
import { describe, expect, it } from "vitest";

describe("getTeamScore", () => {
  describe("Tests unitaires pour chaque dé", () => {
    it('dé vert', () => {
      const equipe: Dice[] = [{ color: 'VERT' }];
      const score = getTeamScore(equipe, 0);
      expect(score).toBe(1); 
    });

    it('dé gris', () => {
      const equipe: Dice[] = [{ color: 'GRIS' }];
      const score = getTeamScore(equipe, 0);
      expect(score).toBe(2); 
    });

    it('dé orange (impair)', () => {
      const equipe: Dice[] = [{ color: 'ORANGE' }];
      const score = getTeamScore(equipe, 0);
      expect(score).toBe(1);
    });

    it('dé orange (pair)', () => {
      const equipe: Dice[] = [{ color: 'ORANGE' }, { color: 'GRIS' }];
      const score = getTeamScore(equipe, 0);
      expect(score).toBe(4);
    });

    it('dé jaune', () => {
      const equipe: Dice[] = [{ color: 'JAUNE' }];
      const score = getTeamScore(equipe, 0);
      expect(score).toBe(-1); 
    });

    it('dé bleu', () => {
      const equipe: Dice[] = [{ color: 'BLEU' }];
      const score = getTeamScore(equipe, 3);
      expect(score).toBe(3);
    });

    it('dé rose', () => {
      const equipe: Dice[] = [{ color: 'ROSE' }];
      const score = getTeamScore(equipe, 0);
      expect(score).toBe(3);
    });

    it('rose met le plus bas à 0', () => {
      const equipe: Dice[] = [{ color: 'ROSE' }, { color: 'VERT' }, { color: 'GRIS' }];
      const score = getTeamScore(equipe, 0);
      expect(score).toBe(5); 
    });
  });

  describe("Tests avec plusieurs dés", () => {
    it('plusieurs verts', () => {
      const equipe: Dice[] = [{ color: 'VERT' }, { color: 'VERT' }, { color: 'VERT' }];
      const score = getTeamScore(equipe, 0);
      expect(score).toBe(3); 
    });

    it('plusieurs gris', () => {
      const equipe: Dice[] = [{ color: 'GRIS' }, { color: 'GRIS' }, { color: 'GRIS' }];
      const score = getTeamScore(equipe, 0);
      expect(score).toBe(6); 
    });

    it('orange et gris', () => {
      const equipe: Dice[] = [{ color: 'ORANGE' }, { color: 'GRIS' }];
      const score = getTeamScore(equipe, 0);
      expect(score).toBe(4); 
    });

    it('orange et gris (impair)', () => {
      const equipe: Dice[] = [{ color: 'ORANGE' }, { color: 'GRIS' }, { color: 'GRIS' }];
      const score = getTeamScore(equipe, 0);
      expect(score).toBe(5);
    });

    it('jaune et bleu', () => {
      const equipe: Dice[] = [{ color: 'JAUNE' }, { color: 'BLEU' }];
      const score = getTeamScore(equipe, 3);
      expect(score).toBe(2);
    });

    it('rose et vert', () => {
      const equipe: Dice[] = [{ color: 'ROSE' }, { color: 'VERT' }, { color: 'VERT' }];
      const score = getTeamScore(equipe, 0);
      expect(score).toBe(3); 
    });

    it('rose, vert, et gris', () => {
      const equipe: Dice[] = [{ color: 'ROSE' }, { color: 'VERT' }, { color: 'GRIS' }];
      const score = getTeamScore(equipe, 0);
      expect(score).toBe(5); 
    });

    it('orange, vert, et bleu', () => {
      const equipe: Dice[] = [{ color: 'ORANGE' }, { color: 'VERT' }, { color: 'BLEU' }];
      const score = getTeamScore(equipe, 3);
      expect(score).toBe(5); 
    });

    it('tous types de dés', () => {
      const equipe: Dice[] = [
        { color: 'VERT' },
        { color: 'GRIS' },
        { color: 'ORANGE' },
        { color: 'JAUNE' },
        { color: 'BLEU' },
        { color: 'ROSE' }
      ];
      const score = getTeamScore(equipe, 3);
      expect(score).toBe(8);
    });
  });

  describe("Tests entre deux équipes", () => {
    it('équipes équilibrées', () => {
      const equipe1: Dice[] = [{ color: 'VERT' }, { color: 'GRIS' }];
      const equipe2: Dice[] = [{ color: 'ORANGE' }, { color: 'BLEU' }];
      const score1 = getTeamScore(equipe1, equipe2.length);
      const score2 = getTeamScore(equipe2, equipe1.length);
      expect(score1).toBe(3); 
      expect(score2).toBe(4); 
    });

    it('équipes déséquilibrées', () => {
      const equipe1: Dice[] = [{ color: 'VERT' }, { color: 'GRIS' }];
      const equipe2: Dice[] = [{ color: 'JAUNE' }, { color: 'BLEU' }];
      const score1 = getTeamScore(equipe1, equipe2.length);
      const score2 = getTeamScore(equipe2, equipe1.length);
      expect(score1).toBe(3); 
      expect(score2).toBe(1); 
    });
  });
});
