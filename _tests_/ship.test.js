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
            dover = {
                addShip: Jest.fn(),
                removeShip: jest.fn(),
                name: 'Dover',
                ships: []
            };

            calais = {
                addShip: Jest.fn(),
                removeShip: jest.fn(),
                name: 'Calais',
                ships: []
            }
            itinerary = {
                ports: [dover, calais]
            }

            });

        ship = new Ship(itinerary);
    })

    it('can be instantiated', () => {

        expect(ship).toBeInstanceOf(Object);
    });

    it('gets added to port on instantiation', () => {

        expect(dover.addShip).toHaveBeenCalledWith(ship);
    })
    
    it('has a starting port', () => {

        expect(ship.currentPort).toBe(dover);
    });

    it('can set sail',() => {

        ship.setSail()

        expect(ship.currentPort).toBeFalsy();
        expect(dover.removeShip).toHaveBeenCalledWith(ship);
    });

    it('can dock at a different port', () => {

        ship.setSail();
        ship.dock();

        expect(ship.currentPort).toBe(calais);
        expect(calais.addShip).toHaveBeenCalledWith(ship);
    });

    it('cant sail further than its itinerarary', () => {
   
        ship.setSail()
        ship.dock();

        expect(() => ship.setSail()).toThrowError('End of itinerary reached');
    })
