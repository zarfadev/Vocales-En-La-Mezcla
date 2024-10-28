import React, { useState } from 'react';

const Card = ({ children, className }) => (
  <div className={`p-8 rounded-lg shadow-lg bg-white max-w-3xl mx-auto ${className}`}>{children}</div>
);

const CardHeader = ({ children }) => (
  <div className="border-b border-coffee-300 pb-6 mb-6">{children}</div>
);

const CardTitle = ({ children }) => (
  <h2 className="text-3xl font-bold text-coffee-800">{children}</h2>
);

const CardContent = ({ children }) => (
  <div>{children}</div>
);

const CardDescription = ({ children }) => (
  <p className="text-md text-coffee-600 leading-relaxed">{children}</p>
);

const Button = ({ children, onClick, className }) => (
  <button
    onClick={onClick}
    className={`w-full px-6 py-3 rounded-lg font-semibold bg-coffee-600 text-cream-50 hover:bg-coffee-700 transition-all duration-200 transform hover:scale-105 hover:shadow-lg ${className}`}
  >
    {children}
  </button>
);

const Input = ({ value, onChange, className, placeholder }) => (
  <input
    value={value}
    onChange={onChange}
    className={`w-full border border-coffee-300 p-3 rounded-lg text-coffee-800 font-mono focus:outline-none focus:ring focus:ring-coffee-300 ${className}`}
    placeholder={placeholder}
  />
);

const Alert = ({ children, variant }) => (
  <div className={`p-5 rounded-lg ${variant === 'destructive' ? 'bg-red-100 text-red-700' : 'bg-yellow-200 text-yellow-700'} shadow-md`}>
    {children}
  </div>
);

const AlertDescription = ({ children }) => (
  <div className="mt-1 text-md">{children}</div>
);

const VowelsConverter = () => {
  const [input, setInput] = useState('[[97, 98, 99], [100, 101, 102]]');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const vowelMap = {
    97: 'a',
    101: 'e',
    105: 'i',
    111: 'o',
    117: 'u'
  };

  const convertToVowels = (matrix) => {
    return matrix.map(row =>
      row.map(num => vowelMap[num] || num)
    );
  };

  const handleConvert = () => {
    try {
      const matrix = JSON.parse(input);
      if (!Array.isArray(matrix) || !matrix.every(row => Array.isArray(row))) {
        throw new Error('La entrada debe ser una matriz 2D válida');
      }
      const converted = convertToVowels(matrix);
      setResult(converted);
      setError('');
    } catch (err) {
      setError(err.message);
      setResult(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-coffee-100 to-cream-50 p-10 font-sans text-gray-900">
      <div className="max-w-4xl mx-auto space-y-10">
        <Card className="shadow-lg border border-coffee-200">
          <CardHeader>
            <CardTitle>
              ☕ Vocales en la Mezcla
            </CardTitle>
            <CardDescription>
              Convierte códigos ASCII de vocales en letras usando una interfaz inspirada en una cafetería.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="bg-cream-50 p-6 rounded-lg shadow-inner">
              <h3 className="font-semibold mb-3 text-coffee-700">Códigos ASCII de vocales:</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {Object.entries(vowelMap).map(([code, vowel]) => (
                  <div
                    key={code}
                    className="bg-coffee-50 p-4 rounded-lg text-center shadow transform hover:scale-105 transition-transform duration-200"
                  >
                    <span className="font-mono text-xl text-coffee-800">{code}</span> → <span className="font-bold text-coffee-600">{vowel}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-2 space-y-3">
              <label className="block text-sm font-medium text-coffee-800">Matriz de entrada:</label>
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="font-mono text-lg"
                placeholder="[[97, 98, 99], [100, 101, 102]]"
              />
            </div>
            <Button
              onClick={handleConvert}
              className="mt-5 bg-coffee-600 hover:bg-coffee-700"
            >
              Convertir
            </Button>
            <p className="mt-2 text-sm text-coffee-500">
              Formato: Array 2D en JSON
            </p>
            <p className="mt-2 text-sm text-coffee-500">
              Creado por Zarfala ^_^
            </p>
            {result && (
              <Card className="bg-green-50 mt-6">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3 text-coffee-800">Resultado:</h3>
                  <pre className="bg-cream-50 p-4 rounded-lg overflow-x-auto font-mono shadow-inner text-coffee-800">
                    {JSON.stringify(result, null, 2)}
                  </pre>
                </CardContent>
              </Card>
            )}
            {error && (
              <Alert variant="destructive">
                <AlertDescription>
                  {error}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
        <Card className="bg-cream-100 shadow-md">
          <CardHeader>
            <CardTitle className="text-xl text-coffee-800">Ejemplo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p><strong>Entrada:</strong> <code>[[97, 98, 99], [100, 101, 102]]</code></p>
              <p><strong>Salida:</strong> <code>[["a", 98, 99], [100, "e", 102]]</code></p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <VowelsConverter />
    </div>
  );
}

export default App;
