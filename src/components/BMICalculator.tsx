import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";

const BMICalculator = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState<number | null>(null);
  const [error, setError] = useState("");

  const validateInputs = () => {
    if (Number(height) < 100 || Number(height) > 250) {
      setError("Рост должен быть от 100 до 250 см");
      return false;
    }
    if (Number(weight) < 30 || Number(weight) > 300) {
      setError("Вес должен быть от 30 до 300 кг");
      return false;
    }
    setError("");
    return true;
  };

  const calculateBMI = () => {
    if (!validateInputs()) return;
    const heightInMeters = Number(height) / 100;
    const weightInKg = Number(weight);
    const calculatedBMI = weightInKg / (heightInMeters * heightInMeters);
    setBmi(Number(calculatedBMI.toFixed(1)));
  };

  const resetCalculator = () => {
    setHeight("");
    setWeight("");
    setBmi(null);
    setError("");
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: "Недостаточный вес", color: "text-blue-500", tip: "Рекомендуется увеличить калорийность питания" };
    if (bmi < 24.9) return { category: "Нормальный вес", color: "text-green-500", tip: "Отличный результат! Поддерживайте текущий образ жизни" };
    if (bmi < 29.9) return { category: "Избыточный вес", color: "text-yellow-500", tip: "Рекомендуется увеличить физическую активность" };
    return { category: "Ожирение", color: "text-red-500", tip: "Рекомендуется проконсультироваться с врачом" };
  };

  const BMIScale = () => (
    <div className="w-full h-4 bg-gradient-to-r from-blue-500 via-green-500 via-yellow-500 to-red-500 rounded-full relative">
      {bmi && (
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: `${(bmi / 40) * 100}%` }}
          className="absolute top-0 transform -translate-x-1/2 -translate-y-full"
        >
          <div className="w-2 h-2 bg-white transform rotate-45 mb-1 mx-auto"></div>
          <div className="bg-white text-primary text-xs font-bold px-2 py-1 rounded-full">
            {bmi}
          </div>
        </motion.div>
      )}
      <div className="flex justify-between text-xs mt-2 text-muted-foreground">
        <span>15</span>
        <span>25</span>
        <span>30</span>
        <span>40</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/50 p-4 md:p-8 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-primary tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
          Frontend Mania
        </h1>
        <p className="mt-2 text-muted-foreground">
          Калькулятор индекса массы тела
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md mx-auto"
      >
        <Card className="backdrop-blur-sm bg-white/10 shadow-2xl border-t border-white/20">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl text-center text-primary">
              Калькулятор BMI
            </CardTitle>
            <p className="text-sm text-center text-muted-foreground">
              Введите ваши данные для расчета индекса массы тела
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Inputs with improved styling */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2" htmlFor="height">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M12 4v16m4-4l-4 4-4-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Рост
                </label>
                <div className="relative group">
                  <Input
                    id="height"
                    type="number"
                    placeholder="Например: 170"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="transition-all hover:border-primary focus:border-primary pr-12 bg-white/5 backdrop-blur-sm"
                    aria-describedby="height-unit"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                    см
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2" htmlFor="weight">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M12 3v3m6 6h3M3 12h3m12 0a6 6 0 11-12 0 6 6 0 0112 0z" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Вес
                </label>
                <div className="relative group">
                  <Input
                    id="weight"
                    type="number"
                    placeholder="Например: 70"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="transition-all hover:border-primary focus:border-primary pr-12 bg-white/5 backdrop-blur-sm"
                    aria-describedby="weight-unit"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                    кг
                  </span>
                </div>
              </div>
            </motion.div>

            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-red-500 text-sm text-center bg-red-500/10 p-2 rounded-md"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <div className="flex gap-2">
              <Button
                onClick={calculateBMI}
                className="flex-1 bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 transition-all duration-300"
                disabled={!height || !weight}
              >
                Рассчитать
              </Button>
              <Button
                onClick={resetCalculator}
                variant="outline"
                className="bg-white/5 hover:bg-white/10 backdrop-blur-sm"
              >
                Сбросить
              </Button>
            </div>

            <AnimatePresence>
              {bmi && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="space-y-4"
                >
                  <div className="p-4 rounded-lg bg-white/5 backdrop-blur-sm space-y-3">
                    <BMIScale />
                    <p className="text-center font-medium mt-4">
                      Ваш BMI: <span className="text-primary text-xl font-bold">{bmi}</span>
                    </p>
                    <p className={`text-center font-medium ${getBMICategory(bmi).color}`}>
                      {getBMICategory(bmi).category}
                    </p>
                    <p className="text-sm text-center text-muted-foreground bg-white/5 p-3 rounded-md">
                      {getBMICategory(bmi).tip}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>

      
      <div className="fixed top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -z-10 animate-pulse" />
      <div className="fixed bottom-20 right-10 w-64 h-64 bg-secondary/10 rounded-full blur-[100px] -z-10 animate-pulse" />
      <div className="fixed top-1/2 left-1/2 w-96 h-96 bg-accent/10 rounded-full blur-[100px] -z-10 animate-pulse transform -translate-x-1/2 -translate-y-1/2" />
    </div>
  );
};

export default BMICalculator;