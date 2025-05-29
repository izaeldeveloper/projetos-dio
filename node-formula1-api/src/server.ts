import fastify from "fastify"
import cors from '@fastify/cors'

const server = fastify({
    logger: true
})

server.register(cors, {
    origin: "*"
})

const teams = [
  { id: 1, name: "McLaren", base: "Woking, United Kingdom" },
  { id: 2, name: "Mercedes", base: "Brackley, United Kingdom" },
  { id: 3, name: "Red Bull Racing", base: "Milton Keynes, United Kingdom" },
  { id: 4, name: "Ferrari", base: "Maranello, Italy" },
  { id: 5, name: "Aston Martin", base: "Silverstone, United Kingdom" },
  { id: 6, name: "Alpine", base: "Enstone, United Kingdom / Viry-Châtillon, France" },
  { id: 7, name: "Williams", base: "Grove, United Kingdom" },
  { id: 8, name: "RB (Visa Cash App RB)", base: "Faenza, Italy" },
  { id: 9, name: "Kick Sauber", base: "Hinwil, Switzerland" },
  { id: 10, name: "Haas", base: "Kannapolis, United States / Banbury, United Kingdom" }
]

const drivers = [
  { id: 1, name: "Max Verstappen", team: "Red Bull Racing" },
  { id: 2, name: "Sergio Pérez", team: "Red Bull Racing" },
  { id: 3, name: "Lewis Hamilton", team: "Mercedes" },
  { id: 4, name: "George Russell", team: "Mercedes" },
  { id: 5, name: "Charles Leclerc", team: "Ferrari" },
  { id: 6, name: "Carlos Sainz", team: "Ferrari" },
  { id: 7, name: "Lando Norris", team: "McLaren" },
  { id: 8, name: "Oscar Piastri", team: "McLaren" },
  { id: 9, name: "Fernando Alonso", team: "Aston Martin" },
  { id: 10, name: "Lance Stroll", team: "Aston Martin" },
  { id: 11, name: "Esteban Ocon", team: "Alpine" },
  { id: 12, name: "Pierre Gasly", team: "Alpine" },
  { id: 13, name: "Alex Albon", team: "Williams" },
  { id: 14, name: "Logan Sargeant", team: "Williams" },
  { id: 15, name: "Yuki Tsunoda", team: "RB (Visa Cash App RB)" },
  { id: 16, name: "Daniel Ricciardo", team: "RB (Visa Cash App RB)" },
  { id: 17, name: "Valtteri Bottas", team: "Kick Sauber" },
  { id: 18, name: "Zhou Guanyu", team: "Kick Sauber" },
  { id: 19, name: "Kevin Magnussen", team: "Haas" },
  { id: 20, name: "Nico Hülkenberg", team: "Haas" }
]

//Get all teams
server.get('/teams', async(req, res) => {
    res.type("application/json").code(200)
    return {teams}
})

//Get all drivers
server.get('/drivers', async(req, res)=>{
    res.type("application/json").code(200)
    return {drivers}
})

interface Params{
    id: string
}

//Get driver by Id
server.get<{Params: Params}>('/drivers/:id', async(req, res)=>{
    const id = parseInt(req.params.id)
    const driver = drivers.find(d => d.id === id)

    if(!driver){
        res.type("application/json").code(404)
        return {message: "Driver not found."}
    }else{
        res.type("application/json").code(200)
        return {driver}
    }
})

//Get team by Id
server.get<{Params: Params}>('/teams/:id', async(req, res)=>{
    const id = parseInt(req.params.id)
    const team = teams.find(d => d.id === id)

    if(!team){
        res.type("application/json").code(404)
        return {message: "Team not found."}
    }else{
        res.type("application/json").code(200)
        return {team}
    }
})

server.listen({port: 3333}, ()=>{
    console.log("Server init.")
})