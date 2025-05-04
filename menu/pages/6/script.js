class Animal {
    constructor(name, species) {
        this.name = name;
        this.species = species;
    }

    describe() {
        return `${this.name} egy ${this.species}.`;
    }

    render() {
        const card = document.createElement('div');
        card.className = 'animal-card';
        card.innerText = this.describe();
        document.body.appendChild(card);
    }
}

// Leszármazott osztály: Ragadozó
class Predator extends Animal {
    constructor(name, species, prey) {
        super(name, species);
        this.prey = prey;
    }

    describe() {
        return `${super.describe()} Kedvence a(z) ${this.prey}.`;
    }
}

// Leszármazott osztály: Növényevő
class Herbivore extends Animal {
    constructor(name, species, favoritePlant) {
        super(name, species);
        this.favoritePlant = favoritePlant;
    }

    describe() {
        return `${super.describe()} Legjobban a(z) ${this.favoritePlant}-t szereti.`;
    }
}

// Példányosítás és megjelenítés
const lion = new Predator('Simba', 'oroszlán', 'zebra');
const elephant = new Herbivore('Dumbo', 'elefánt', 'banánlevél');
const giraffe = new Herbivore('Melman', 'zsiráf', 'akácia levél');

// Függvény az összes állat rendereléséhez
function renderAllAnimals() {
    lion.render();
    elephant.render();
    giraffe.render();
}

// Az oldal betöltésekor rendereljük az állatokat
document.addEventListener('DOMContentLoaded', renderAllAnimals);