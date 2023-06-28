const autosImportados = require('./autos')

let concesionaria = {
  autos: autosImportados,
  buscarAuto: function (patente) {
    const autoEncontrado = this.autos.find(auto => auto.patente === patente)
    return autoEncontrado ? autoEncontrado : null
  },
  venderAuto: function (patente) {
    let autoEncontrado = this.buscarAuto(patente)

    if (autoEncontrado === null) return "No se encuentra el auto con la patente"

    autoEncontrado.vendido = true
  },
  autosParaLaVenta: function () {
    return this.autos.filter(auto => !auto.vendido)
  },
  autosNuevos: function () {
    return this.autosParaLaVenta().filter(auto => auto.km < 100)
  },
  listaDeVentas: function () {
    return this.autos.filter(auto => auto.vendido).map(auto => auto.precio)
  },
  totalDeVentas: function () {
    return this.listaDeVentas().reduce((acc, prev) => {
      return acc + prev
    }, 0)
  },
  puedeComprar: function (auto, persona) {
    const { precio, cuotas } = auto
    const { capacidadDePagoEnCuotas, capacidadDePagoTotal } = persona
    const cuota = precio / cuotas

    return capacidadDePagoTotal > precio && capacidadDePagoEnCuotas > cuota

  },
  autosQuePuedeComprar: function (persona) {
    const autos = this.autosParaLaVenta().filter(auto => {
      if (this.puedeComprar(auto, persona)) return auto
    })
    return autos
  }
}

const persona = {
  nombre: "Juan",
  capacidadDePagoEnCuotas: 20000,
  capacidadDePagoTotal: 100000
}

console.log(concesionaria.autos)
console.log("\n", "-".repeat(10), "\n")
console.log(concesionaria.buscarAuto('APL123'))
console.log("\n", "-".repeat(10), "\n")
concesionaria.venderAuto('APL123')
console.log("\n", "-".repeat(10), "\n")
console.log(concesionaria.autosParaLaVenta())
console.log("\n", "-".repeat(10), "\n")
console.log(concesionaria.autosNuevos())
console.log("\n", "-".repeat(10), "\n")
console.log(concesionaria.listaDeVentas())
console.log("\n", "-".repeat(10), "\n")
console.log(concesionaria.totalDeVentas())
console.log("\n", "-".repeat(10), "\n")
console.log(concesionaria.puedeComprar(concesionaria.buscarAuto('APL123'), persona))
console.log("\n", "-".repeat(10), "\n")
console.log(concesionaria.autosQuePuedeComprar(persona))
console.log("\n", "-".repeat(10), "\n")