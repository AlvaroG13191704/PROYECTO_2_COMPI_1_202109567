import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  TableCellsIcon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  ChartBarIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

const products = [
  { name: 'Reporte de Errores', description: 'Se monstrarán todos los errores encontrados al realizar el análisis léxico', href: '#', icon: ChartPieIcon },
  { name: 'Generar Árbol AST (Árbol de Análisis Sintáctico)', description: 'se debe generar una imagen del árbol de análisis sintáctico que se genera al realizar los análisis', href: '#', icon: ChartBarIcon },
  { name: 'Reporte de Tabla de Símbolos:', description: 'Se mostrarán todas las variables, métodos y funciones que han sido declarados dentro del flujo del programa', href: '#', icon: TableCellsIcon },
]


const Navbar = () => {


  return (
    <header className="bg-gray-900">
      <nav className="mx-auto flex max-w-7xl items-center justify-around p-6 lg:px-8" aria-label="Global">
        <button className="text-sm font-semibold leading-6 text-white hover:border-b-2 border-white">
          Crear archivos
        </button>
        <button className="text-sm font-semibold leading-6 text-white hover:border-b-2 border-white">
          Abrir archivos
        </button>
        <button className="text-sm font-semibold leading-6 text-white hover:border-b-2 border-white">
          Guardar archivo
        </button>
        <button className="text-sm font-semibold leading-6 text-white hover:border-b-2 border-white">
          Eliminar pestaña
        </button>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">
            <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-white">
              Reportes
              <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-gray-900 shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                  {products.map((item) => (
                    <div
                      key={item.name}
                      className="group relative flex gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-700"
                    >
                      <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-gray-50">
                        <item.icon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                      </div>
                      <div className="flex-auto">
                        <a href={item.href} className="block font-semibold text-white">
                          {item.name}
                          <span className="absolute inset-0" />
                        </a>
                        <p className="mt-1 text-gray-100">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>
        </Popover.Group>
      </nav>
    </header>
  )
}

export default Navbar