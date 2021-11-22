class Planet {
    // 2. У каждого объекта должен быть следующий набор свойств:
    //      Название
    //      Масса
    //      Удаленность от Солнца
    //      Наличие системы колец

    constructor(name, weight, distance, haveRing) {
        this._name = name;
        this._weight = weight;
        this._distance = distance;
        this._haveRing = haveRing;
    }
    get name() {
        return this._name;
    }
    get weight() {
        return this._weight;
    }
    get distance() {
        return this._distance;
    }
    get haveRing() {
        return this._haveRing;
    }

}

const planetsArrayProps = [
    {name:'Mercury', weight:0.330, distance:57.9, haveRing:false},
    {name:'Venus', weight:4.87, distance:108.2, haveRing:false},
    {name:'Earth', weight:5.97, distance:149.6, haveRing:false},
    {name:'Mars', weight:0.642, distance:227.92, haveRing:false},
    {name:'Saturn', weight:568, distance:1433.5, haveRing:true},
    {name:'Jupiter', weight:1899, distance:778.6, haveRing:true},
    {name:'Neptune', weight:102, distance:4495.1, haveRing:true},
    {name:'Uranus', weight:86.8, distance:2872.5, haveRing:true},
];
class planetsArray extends Array {

    constructor(props) {
        super(props);
    }

    logSortByDistance(log) {
        this.sort(function(planet,planet2) {
            return planet.distance - planet2.distance;
        });
        if (log===true) {
            document.write('3. ');
            this.map(planet => document.write(planet.name + " "));
            document.write("<br>");
        }
    }

    logIsHaveRing() {
        document.write("4. ");
        this.map(planet => planet.haveRing ? document.write(planet.name + " ") : false );
        document.write("<br>");
    }

    logSortByWeight(type) {
        this.sort(function(planet,planet2) {
            return planet.weight - planet2.weight;
        });
        // По убыванию
        if (type==="desc") {
            this.reverse();
        }
        document.write("5. ");
        this.map(planet=>document.write(planet.name + " weight: " + planet.weight + " | "));
        document.write("<br>");
    }

    logMinAndMaxDistanceBetween() {
        let sunDiameter = 1.4;
        this.logSortByDistance();
        this.reduce((prev, current, index) => {
            document.write(
                '6.' + index + ' Min distance between '
                + prev.name
                + ' and '
                + current.name
                + ' is:'
                + Math.trunc(current.distance-prev.distance)
                + ' | Max distance between '
                + prev.name
                + ' and '
                + current.name
                + ' is:'
                + Math.trunc(current.distance+prev.distance+sunDiameter)
                + " <br>"
            );
            return current;
        });
    }

    logMaxFlyPlanet(fuel) {
        const earth = this.find(planet => planet.name==="Earth");
        const sunDiameter = 1.4;
        if (!fuel) {
           return console.log('No fuel');
        }
        const planetsList = [];
        let maxPlanet;
        this.map(planet=>{
            if (planet.name==='Earth' || (planet.distance+earth.distance+sunDiameter)>fuel) {
                return;
            }
            planetsList.push({name:planet.name, distanceMax:planet.distance+earth.distance+sunDiameter});
        });
        planetsList.reduce((prev,planet)=>{
            if (planet.distanceMax<prev.distanceMax) {
                maxPlanet = prev.name;
            }
            if (planet.distanceMax>prev.distanceMax) {
                maxPlanet = planet.name;
            }
            return planet;
        });
        document.write('7. ' + maxPlanet);
    }
}

// 1. Создать массив объектов, где каждый объект - планета Солнечной системы.
let planets = new planetsArray();
planets.pop();
planetsArrayProps.map(planet => {
    planets.push(new Planet(planet.name, planet.weight, planet.distance, planet.haveRing));
});
planets.map((planet, index)=> {
    document.write("1." + (index+1) + "  " + planet.name + " " + planet.weight + " " + planet.distance + " " + planet.haveRing + " <br>")
});

// planets.logSortByDistance() or planets.logSortByDistance(true) Sort or Sort and log
// 3. Создать функцию которая выводит список названий планет в порядке удаленности от Солнца
planets.logSortByDistance(true);

// planets.logIsHaveRing();
// 4. Создать функцию которая выводит список планет у которых отсутствуют кольца
planets.logIsHaveRing();

// planets.logSortByWeight(); planets.logSortByWeight("desc"); - для обратной сортировки
// 5. Создать функцию которая выводит названия планет с наибольшей и наименьшей массой
planets.logSortByWeight();

// planets.logMinAndMaxDistanceBetween();
// 6. Создать функцию которая находит минимальное и максимальное расстояния между двумя последовательными планетами
planets.logMinAndMaxDistanceBetween();

// planets.logMaxFlyPlanet(fuelValue - integer );
// Создать функцию которая выводит название самой удаленной планеты до
// которой способен долететь космонавт на космическом корабле с
// запасом хода (40 млн км., 150 млн км., 1600 млн км.) при условии
// отправления с планеты Земля. Если космонавт не в состоянии долететь
// ни до одной планеты, то необходимо вывести - “невозможно долететь до ближайшей планеты“
planets.logMaxFlyPlanet(500);