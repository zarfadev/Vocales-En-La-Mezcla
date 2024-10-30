import React, { useState } from "react";
import { Coffee, BookOpen, Lightbulb, Sparkles, ChefHat, Book, Zap, Scale, ThermometerSun, ChevronRight, Beaker } from "lucide-react";

const SteamEffect = () => (
  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
    <div className="relative w-8 h-16">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-gray-200/30 rounded-full animate-bounce"
          style={{
            left: `${i * 10}px`,
            animationDelay: `${i * 0.5}s`,
            opacity: 0,
          }}
        />
      ))}
    </div>
  </div>
);

const RecipeCard = ({ recipe, className = "" }) => (
  <div className={`bg-white/95 rounded-lg shadow-lg transition-all duration-300 ${className}`}>
    <div className="p-6 space-y-4">
      <h3 className="text-xl font-bold text-gray-800 mb-2">{recipe.name}</h3>
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <ThermometerSun className="w-5 h-5 text-gray-600" />
          <span className="text-gray-700 font-medium">{recipe.temperature}°C</span>
        </div>
        <div className="flex items-center space-x-2">
          <Scale className="w-5 h-5 text-gray-600" />
          <span className="text-gray-700 font-medium">{recipe.ratio}</span>
        </div>
        <p className="text-gray-600 leading-relaxed">{recipe.instructions}</p>
      </div>
    </div>
  </div>
);

const Tooltip = ({ children, content }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="inline-block"
      >
        {children}
      </div>
      {isVisible && (
        <div className="absolute z-50 w-80 transform -translate-x-1/2 left-1/2 mt-2">
          <div className="duration-200">{content}</div>
        </div>
      )}
    </div>
  );
};

const CoffeeIngredient = ({ code }) => {
  const ingredients = {
    a: {
      name: "Café Arábica",
      icon: Coffee,
      recipe: {
        name: "Espresso Perfecto",
        temperature: 93,
        ratio: "1:2 (18g:36g)",
        instructions:
          "Muele 18g de granos a finura media-fina. Precalienta la máquina. Extrae durante 25-30 segundos.",
      },
    },
    e: {
      name: "Esencia de Vainilla",
      icon: Sparkles,
      recipe: {
        name: "Vainilla Latte Especial",
        temperature: 90,
        ratio: "1:3:1 (espresso:leche:vainilla)",
        instructions:
          "Prepara el espresso, añade 15ml de esencia, vaporiza la leche creando microespuma sedosa.",
      },
    },
    i: {
      name: "Infusión de Canela",
      icon: ChefHat,
      recipe: {
        name: "Canela Brew Artesanal",
        temperature: 95,
        ratio: "1 rama : 250ml",
        instructions:
          "Infusiona la rama de canela en el café recién preparado por 3-4 minutos. Remueve suavemente.",
      },
    },
    o: {
      name: "Onzas de Chocolate",
      icon: Zap,
      recipe: {
        name: "Mocha Supremo",
        temperature: 88,
        ratio: "2:3:1 (café:leche:chocolate)",
        instructions:
          "Derrite el chocolate negro, combina con espresso caliente, añade leche vaporizada en forma circular.",
      },
    },
    u: {
      name: "Umbela de Cardamomo",
      icon: Book,
      recipe: {
        name: "Café Árabe Real",
        temperature: 92,
        ratio: "3 vainas : 18g café",
        instructions:
          "Muele las vainas de cardamomo con los granos. Prepara en ibrik tradicional con dos subidas.",
      },
    },
  };

  const ingredient = ingredients[code];

  if (!ingredient) {
    return (
      <div className="bg-gray-100 px-4 py-3 rounded-lg w-40 flex items-center justify-center">
        <span className="text-gray-500 font-mono">{code}</span>
      </div>
    );
  }

  return (
    <Tooltip content={<RecipeCard recipe={ingredient.recipe} />}>
      <div className="group relative">
        <div className="relative transform transition-all duration-300 hover:scale-105">
          <div className="bg-white/80 px-4 py-3 rounded-lg cursor-help border border-coffee-200 hover:border-coffee-300 hover:bg-white shadow-sm hover:shadow-md transition-all duration-200 w-40">
            <div className="flex items-center space-x-3">
              <ingredient.icon className="w-5 h-5 text-gray-600 group-hover:text-gray-700 flex-shrink-0" />
              <span className="text-gray-800 font-medium group-hover:text-gray-900 truncate">
                {ingredient.name}
              </span>
            </div>
          </div>
          <SteamEffect />
        </div>
      </div>
    </Tooltip>
  );
};

const VowelsConverter = () => {
  const [input1, setInput1] = useState("97,98,99");
  const [input2, setInput2] = useState("100,101,102");
  const [result, setResult] = useState(null);
  const [matrixResult, setMatrixResult] = useState(null);
  const [error, setError] = useState("");
  const [isConverting, setIsConverting] = useState(false);

  const vowelMap = {
    97: "a",
    101: "e",
    105: "i",
    111: "o",
    117: "u",
  };

  const convertToVowels = (matrix) => {
    return matrix.map((row) => row.map((num) => vowelMap[num] || num));
  };

  const handleConvert = async () => {
    setIsConverting(true);
    try {
      const row1 = input1.split(",").map((num) => parseInt(num.trim()));
      const row2 = input2.split(",").map((num) => parseInt(num.trim()));

      if (row1.some(isNaN) || row2.some(isNaN)) {
        throw new Error("Por favor ingresa solo códigos numéricos válidos separados por comas");
      }

      const matrix = [row1, row2];
      await new Promise((resolve) => setTimeout(resolve, 800));
      const converted = convertToVowels(matrix);
      setResult(converted);
      setMatrixResult(JSON.stringify(converted));
      setError("");
    } catch (err) {
      setError(err.message);
      setResult(null);
      setMatrixResult(null);
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-coffee-100 via-white to-coffee-50 p-6 md:p-10 font-sans text-coffee-900">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center mb-12 bg-white/40 p-8 rounded-2xl shadow-lg">
          <h1 className="text-4xl md:text-5xl font-bold text-coffee-800 mb-4 flex items-center justify-center">
            <Coffee className="w-10 h-10 md:w-12 md:h-12 mr-4 text-coffee-600" />
            El Alquimista del Café
          </h1>
          <p className="text-coffee-600 text-lg md:text-xl">
            Descifrando los secretos de las mezclas perfectas
          </p>
        </div>

        <div className="bg-white/80 rounded-2xl shadow-xl border border-gray-200">
          <div className="p-6 md:p-8">
            <div className="border-b border-coffee-200 pb-6 mb-8">
              <h2 className="text-3xl font-bold text-coffee-800 mb-4">
                Grimorio de Recetas
              </h2>
              <p className="text-coffee-600">
                Ingresa los códigos místicos para descubrir nuevas combinaciones de sabores
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-cream-50/50 p-6 rounded-xl shadow-inner border border-coffee-100">
                <h3 className="text-xl font-bold text-coffee-800 mb-4">
                  Ingredientes Ancestrales:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {Object.entries(vowelMap).map(([code, vowel]) => (
                    <div
                      key={code}
                      className="bg-white/80 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-coffee-100 hover:border-coffee-200"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-mono text-xl text-coffee-800">
                          {code}
                        </span>
                        <span className="text-coffee-600">→</span>
                        <CoffeeIngredient code={vowel} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-coffee-800">
                      Primera Mezcla:
                    </label>
                    <input
                      value={input1}
                      onChange={(e) => setInput1(e.target.value)}
                      className="w-full border border-coffee-200 p-4 rounded-lg text-gray-800 font-mono bg-white/80 focus:outline-none focus:ring-2 focus:ring-coffee-300 focus:border-coffee-300 transition-all duration-200"
                      placeholder="97,98,99"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-coffee-800">
                      Segunda Mezcla:
                    </label>
                    <input
                      value={input2}
                      onChange={(e) => setInput2(e.target.value)}
                      className="w-full border border-coffee-200 p-4 rounded-lg text-gray-800 font-mono bg-white/80 focus:outline-none focus:ring-2 focus:ring-coffee-300 focus:border-coffee-300 transition-all duration-200"
                      placeholder="100,101,102"
                    />
                  </div>
                </div>

                <button
                  onClick={handleConvert}
                  disabled={isConverting}
                  className="w-full px-6 py-4 rounded-lg font-semibold bg-coffee-600 text-white hover:bg-coffee-700 active:bg-coffee-800 transition-all duration-300 transform hover:scale-102 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-2"
                >
                  {isConverting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                      <span>Descubriendo Sabores...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      <span>Crear Blend Mágico</span>
                    </>
                  )}
                </button>

                {matrixResult && (
                  <div className="bg-cream-50/50 rounded-xl p-6 shadow-inner border border-coffee-100 animate-in slide-in-from-bottom-2">
                    <h3 className="text-xl font-bold text-coffee-800 mb-4">
                      Fórmula Descifrada:
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-lg border border-coffee-100 text-gray-800 font-medium group-hover:text-gray-900 overflow-x-auto">
                      <pre>{matrixResult}</pre>
                    </div>
                  </div>
                )}

                {result && (
                  <div className="bg-cream-50/50 rounded-xl p-6 shadow-inner border border-coffee-100 animate-in slide-in-from-bottom-2">
                    <h3 className="text-xl font-bold text-coffee-800 mb-4">
                      Tu Blend Personalizado:
                    </h3>
                    {result.map((row, i) => (
                      <div key={i} className="mb-6 last:mb-0">
                        <div className="flex flex-wrap gap-3">
                          {row.map((item, j) => (
                            <CoffeeIngredient key={`${i}-${j}`} code={item} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {error && (
                  <div className="bg-red-50 text-red-700 p-4 rounded-lg border border-red-200">
                    <p className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        />
                      </svg>
                      {error}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/80 rounded-2xl shadow-xl border border-gray-200">
          <div className="p-8">
            <div className="flex items-center space-x-3 mb-6">
              <BookOpen className="w-6 h-6 text-coffee-600" />
              <h3 className="text-2xl font-bold text-coffee-800">
                Recetas de Ejemplo
              </h3>
            </div>

            <div className="flex items-center space-x-2 mb-8">
              <Lightbulb className="w-5 h-5 text-amber-500" />
              <p className="text-coffee-600 italic">
                Descubre algunas combinaciones mágicas para inspirar tus
                creaciones
              </p>
            </div>

            <div className="grid gap-6">
              <div className="group bg-gradient-to-r from-cream-50/80 to-white/80 rounded-xl border border-coffee-100 p-6 transition-all duration-300 hover:shadow-md hover:border-coffee-300">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="bg-coffee-600/10 rounded-full p-2">
                    <Beaker className="w-5 h-5 text-coffee-700" />
                  </div>
                  <h4 className="font-semibold text-coffee-800">
                    Fusión Clásica
                  </h4>
                </div>

                <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
                  <code className="font-mono text-sm bg-white/80 px-3 py-2 rounded-lg text-coffee-700 border border-coffee-100">
                    [[97, 101], [105, 111]]
                  </code>
                  <ChevronRight className="hidden md:block w-5 h-5 text-coffee-400" />
                  <div className="mt-3 md:mt-0 flex items-center space-x-2">
                    <div className="h-px w-4 bg-coffee-300"></div>
                    <p className="text-coffee-600">
                      <span className="font-medium">Resultado:</span> Arábica +
                      Vainilla | Canela + Chocolate
                    </p>
                  </div>
                </div>
              </div>

              <div className="group bg-gradient-to-r from-cream-50/80 to-white/80 rounded-xl border border-coffee-100 p-6 transition-all duration-300 hover:shadow-md hover:border-coffee-300">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="bg-coffee-600/10 rounded-full p-2">
                    <Coffee className="w-5 h-5 text-coffee-700" />
                  </div>
                  <h4 className="font-semibold text-coffee-800">
                    Blend Especial
                  </h4>
                </div>

                <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
                  <code className="font-mono text-sm bg-white/80 px-3 py-2 rounded-lg text-coffee-700 border border-coffee-100">
                    [[97, 117], [101, 105]]
                  </code>
                  <ChevronRight className="hidden md:block w-5 h-5 text-coffee-400" />
                  <div className="mt-3 md:mt-0 flex items-center space-x-2">
                    <div className="h-px w-4 bg-coffee-300"></div>
                    <p className="text-coffee-600">
                      <span className="font-medium">Resultado:</span> Arábica +
                      Cardamomo | Vainilla + Canela
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-amber-50/50 rounded-lg p-4 border border-amber-200/50">
              <div className="flex items-start space-x-3">
                <Lightbulb className="w-5 h-5 text-amber-500 flex-shrink-0 mt-1" />
                <p className="text-sm text-coffee-700">
                  Prueba estas combinaciones o crea las tuyas propias
                  introduciendo diferentes códigos ASCII. ¡Cada número
                  corresponde a un ingrediente único!
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="p-3 bg-white/80 rounded-2xl shadow-xl border border-gray-200">
            <p class="text-center text-md text-coffee-600 leading-relaxed">
                Desarrollado por Zarfala ♥️
            </p>

            <div class="flex items-center justify-center space-y-4">
                <a href="https://github.com/zarfadev" class="mt-2 flex items-center space-x-2 bg-coffee-600 text-white rounded-lg px-3 py-3 hover:bg-coffee-800 transition duration-200">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M12 .297c-6.627 0-12 5.373-12 12 0 5.304 3.438 9.801 8.207 11.388.6.112.827-.26.827-.578 0-.287-.01-1.245-.015-2.253-3.338.725-4.043-1.606-4.043-1.606-.546-1.384-1.333-1.754-1.333-1.754-1.09-.744.083-.73.083-.73 1.205.084 1.838 1.237 1.838 1.237 1.067 1.826 2.8 1.298 3.486.992.108-.773.418-1.298.762-1.597-2.665-.302-5.467-1.333-5.467-5.933 0-1.313.467-2.387 1.235-3.227-.124-.303-.536-1.532.117-3.194 0 0 1.008-.323 3.301 1.228.958-.266 1.986-.4 3.006-.404 1.02.004 2.048.138 3.006.404 2.292-1.551 3.301-1.228 3.301-1.228.653 1.662.242 2.891.118 3.194.77.84 1.235 1.914 1.235 3.227 0 4.608-2.806 5.63-5.475 5.926.43.37.817 1.098.817 2.219 0 1.606-.015 2.898-.015 3.288 0 .32.226.694.83.578C20.565 22.097 24 17.5 24 12.297c0-6.627-5.373-12-12-12z"/>
                    </svg>
                    <span>GitHub</span>
                </a>
            </div>

            <div class="space-y-4"></div>
        </div>
      </div>
    </div>
  );
};

export default VowelsConverter;
