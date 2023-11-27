/* globals describe it expect */
const Ship = require('../src/Ship.js');
const Port = require('../src/Port.js');
const Itinerary = require('../src/itinerary.js');


describe('Ship', () => {
        let ship;
        let dover;
        let itinerary;
        let calais;

        beforeEach(() => {
        dover = new Port('Dover');
        calais = new Port('Calais');
        itinerary = new Itinerary([dover, calais]);
        ship = new Ship(itinerary);
    })

    it('can be instantiated', () => {

        expect(ship).toBeInstanceOf(Object);
    });

    it('gets added to port on instantiation', () => {

        expect(dover.ships).toContain(ship);
    })
    
    it('has a starting port', () => {

        expect(ship.currentPort).toBe(dover);
    });

    it('can set sail',() => {

        ship.setSail()

        expect(ship.currentPort).toBeFalsy();
        expect(dover.ships).not.toContain(ship);
    });

    it('can dock at a different port', () => {

        ship.setSail();
        ship.dock();

        expect(ship.currentPort).toBe(calais);
        expect(calais.ships).toContain(ship);
    });

    it('cant sail further than its itinerarary', () => {
   
        ship.setSail()
        ship.dock();

        expect(() => ship.setSail()).toThrowError('End of itinerary reached');
    })

});
