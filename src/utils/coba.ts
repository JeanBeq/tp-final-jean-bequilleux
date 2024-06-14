// Définitions des valeurs des dés
const VALUE_VERT = 1;
const VALUE_GRIS = 2;
const VALUE_ORANGE_IMPAIR = 1;
const VALUE_ORANGE_PAIR = 2;
const VALUE_JAUNE = -1;
const VALUE_ROSE = 3;

// Définitions des couleurs des dés
export type DiceColor = 'VERT' | 'GRIS' | 'ORANGE' | 'JAUNE' | 'BLEU' | 'ROSE';

export interface Dice {
    color: DiceColor;
}

// Fonction pour calculer la valeur d'une équipe
export function getTeamScore(team: Dice[], otherTeamSize: number): number {
    let score = 0;
    const teamSize = team.length;
    let hasRose = false;
    let minDiceValue = Infinity;

    // Calculer les valeurs des dés et trouver la valeur minimale (hors dés roses)
    const diceValues = team.map(dice => {
        const diceValue = getDiceValue(dice.color, teamSize, otherTeamSize);
        if (dice.color === 'ROSE') {
            hasRose = true;
        } else if (diceValue < minDiceValue) {
            minDiceValue = diceValue;
        }
        return diceValue;
    });

    // Calculer le score en tenant compte de l'annulation des dés de valeur minimale par les dés roses
    diceValues.forEach((value, index) => {
        if (hasRose && value === minDiceValue && team[index].color !== 'ROSE') {
            score += 0; // Annuler la valeur de ce dé
        } else {
            score += value;
        }
    });

    return score;
}

// Fonction pour obtenir la valeur d'un dé
function getDiceValue(color: DiceColor, teamSize: number, otherTeamSize: number): number {
    switch (color) {
        case 'VERT':
            return VALUE_VERT;
        case 'GRIS':
            return VALUE_GRIS;
        case 'ORANGE':
            return (teamSize % 2 === 0) ? VALUE_ORANGE_PAIR : VALUE_ORANGE_IMPAIR;
        case 'JAUNE':
            return VALUE_JAUNE;
        case 'BLEU':
            return otherTeamSize;
        case 'ROSE':
            return VALUE_ROSE;
        default:
            return 0;
    }
}
