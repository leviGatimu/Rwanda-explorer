import React, { useState, useEffect, useMemo } from 'react';
import { BottomNav } from './components/BottomNav';
import { Tab, Lesson, UserProgress, LessonSection, QuizCategory, QuizQuestion } from './types';
import { LESSONS, QUIZ_CATEGORIES } from './constants';
import { LessonCard } from './components/LessonCard';
import { generateMnemonic, askHistoryTutor } from './services/geminiService';
import { 
  Trophy, 
  Flame, 
  ChevronRight, 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  RefreshCw, 
  Search,
  BookOpen,
  BrainCircuit,
  Sparkles,
  Map,
  User,
  ShieldCheck,
  Volume2,
  Play,
  Pause,
  Clock,
  Star,
  ChevronDown
} from 'lucide-react';

// --- SIDEBAR COMPONENT ---
const Sidebar = ({ currentTab, onTabChange, progress }: { currentTab: Tab, onTabChange: (t: Tab) => void, progress: UserProgress }) => {
  const navItems = [
    { id: Tab.HOME, icon: Map, label: 'Dashboard' },
    { id: Tab.LEARN, icon: BookOpen, label: 'Lessons' },
    { id: Tab.QUIZ, icon: BrainCircuit, label: 'Practice Quiz' },
    { id: Tab.AI_TUTOR, icon: Sparkles, label: 'AI Tutor' },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white h-screen fixed left-0 top-0 border-r border-gray-200 z-50">
      <div className="p-8 pb-4">
        <div className="flex items-center gap-2 text-rwanda-blue mb-2">
          <ShieldCheck size={32} />
          <h1 className="font-bold text-xl leading-none">Rwanda<br/><span className="text-rwanda-green">Explorer</span></h1>
        </div>
      </div>
      
      <nav className="flex-1 px-4 py-4 space-y-2">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
              currentTab === item.id 
                ? 'bg-blue-50 text-rwanda-blue font-semibold shadow-sm translate-x-1' 
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <item.icon size={20} className={currentTab === item.id ? 'text-rwanda-blue' : 'text-gray-400 group-hover:text-rwanda-green'} />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-6 border-t border-gray-100">
        <div className="bg-gradient-to-r from-gray-50 to-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-rwanda-yellow flex items-center justify-center text-rwanda-blue font-bold border-2 border-white shadow-sm">
              JD
            </div>
            <div>
              <p className="text-sm font-bold text-gray-800">John Doe</p>
              <p className="text-xs text-gray-500">Student</p>
            </div>
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>Points</span>
            <span className="font-bold text-rwanda-blue">{progress.points}</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

// --- HOME VIEW ---
const HomeView = ({ 
  progress, 
  setCurrentTab, 
  setSelectedLesson 
}: { 
  progress: UserProgress, 
  setCurrentTab: (t: Tab) => void,
  setSelectedLesson: (l: Lesson) => void
}) => (
    <div className="pb-24 md:pb-8 animate-fade-in">
      {/* Hero Section */}
      <div className="bg-rwanda-blue text-white p-6 pb-12 md:p-10 md:rounded-3xl rounded-b-[2.5rem] relative overflow-hidden imigongo-bg shadow-xl">
        <div className="relative z-10 max-w-4xl mx-auto md:mx-0">
          <div className="flex justify-between items-start md:items-center mb-6">
            <div>
              <p className="text-rwanda-yellow text-sm font-semibold uppercase tracking-wider mb-1">Muraho, Scholar!</p>
              <h1 className="text-3xl md:text-4xl font-bold">Ready to master history?</h1>
            </div>
            
            {/* Desktop Stats in Hero */}
            <div className="hidden md:flex gap-4">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 flex items-center gap-3 border border-white/20">
                <div className="bg-rwanda-yellow p-2 rounded-full text-rwanda-blue">
                  <Flame size={20} fill="currentColor" />
                </div>
                <div>
                  <p className="text-xs text-blue-100">Streak</p>
                  <p className="font-bold text-lg">{progress.streak} Days</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Mobile Stats Card */}
          <div className="md:hidden bg-white/10 backdrop-blur-md rounded-xl p-4 flex items-center gap-4 border border-white/20">
            <div className="bg-rwanda-yellow p-3 rounded-full text-rwanda-blue">
              <Flame size={24} fill="currentColor" />
            </div>
            <div>
              <p className="text-xs text-blue-100">Daily Streak</p>
              <p className="font-bold text-xl">{progress.streak} Days</p>
            </div>
            <div className="h-8 w-[1px] bg-white/20 mx-2"></div>
            <div>
              <p className="text-xs text-blue-100">Total Points</p>
              <p className="font-bold text-xl">{progress.points}</p>
            </div>
          </div>
        </div>
        
        {/* Decorative Circles */}
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/5 rounded-full blur-2xl animate-pulse"></div>
        <div className="hidden md:block absolute bottom-0 right-20 w-64 h-64 bg-rwanda-green/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-0">
        {/* Desktop Grid Layout Wrapper */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:mt-8">
          
          {/* Main Content Column */}
          <div className="md:col-span-2 space-y-8">
            {/* Daily Fact */}
            <div className="-mt-6 md:mt-0 relative z-20 bg-white p-6 rounded-xl shadow-md border-l-4 border-rwanda-yellow hover:shadow-lg transition-all duration-300 animate-slide-up">
              <div className="flex gap-4 items-start">
                <div className="bg-yellow-50 p-3 rounded-full text-rwanda-yellow shrink-0">
                  <Sparkles size={24} />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Daily Fact</h3>
                  <p className="text-gray-700 text-sm md:text-base font-medium leading-relaxed">
                    The Rwandan flag's sun has 24 rays, representing the enlightenment and transparency of the nation, guiding its people towards a bright future.
                  </p>
                </div>
              </div>
            </div>

            {/* Suggested Lessons */}
            <div className="animate-slide-up" style={{animationDelay: '0.1s'}}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-xl text-gray-800">Continue Learning</h2>
                <button 
                  className="text-rwanda-blue text-sm font-semibold hover:bg-blue-50 px-3 py-1 rounded-lg transition-colors"
                  onClick={() => setCurrentTab(Tab.LEARN)}
                >
                  View Library
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {LESSONS.slice(0, 2).map(lesson => (
                  <LessonCard 
                    key={lesson.id} 
                    lesson={lesson} 
                    onClick={() => setSelectedLesson(lesson)} 
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar Column (Desktop Only mainly, but stacked on mobile) */}
          <div className="space-y-6 animate-slide-up" style={{animationDelay: '0.2s'}}>
             <h2 className="font-bold text-xl text-gray-800 hidden md:block">Quick Actions</h2>
             
             <div 
                onClick={() => setCurrentTab(Tab.QUIZ)}
                className="group cursor-pointer bg-gradient-to-br from-rwanda-green to-emerald-700 p-6 rounded-2xl text-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
              >
                <div className="relative z-10">
                  <div className="bg-white/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Trophy size={28} className="text-rwanda-yellow" />
                  </div>
                  <h3 className="font-bold text-lg">Daily Quiz</h3>
                  <p className="text-blue-100 text-sm mt-1">Earn 50 points today</p>
                </div>
                <Trophy size={100} className="absolute -bottom-4 -right-4 text-white/10 rotate-12 group-hover:rotate-0 transition-transform duration-500" />
              </div>

              <div 
                onClick={() => setCurrentTab(Tab.AI_TUTOR)}
                className="group cursor-pointer bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-2xl text-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
              >
                <div className="relative z-10">
                  <div className="bg-white/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <BrainCircuit size={28} className="text-purple-100" />
                  </div>
                  <h3 className="font-bold text-lg">AI Tutor</h3>
                  <p className="text-indigo-100 text-sm mt-1">Generate study mnemonics</p>
                </div>
                <BrainCircuit size={100} className="absolute -bottom-4 -right-4 text-white/10 rotate-12 group-hover:rotate-0 transition-transform duration-500" />
              </div>
          </div>

        </div>
      </div>
    </div>
  );

// --- LEARN VIEW ---
const LearnView = ({ setSelectedLesson }: { setSelectedLesson: (l: Lesson) => void }) => (
    <div className="pb-24 pt-6 px-6 md:px-0 max-w-6xl mx-auto animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Explore Topics</h1>
          <p className="text-gray-500 mt-1">Master Rwandan history and civic values</p>
        </div>
        
        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar md:pb-0">
          {['All', 'History', 'Civics', 'Values'].map((cat, idx) => (
            <button 
              key={cat}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                idx === 0 
                  ? 'bg-rwanda-blue text-white shadow-lg shadow-blue-200 hover:bg-blue-600' 
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {LESSONS.map((lesson, idx) => (
          <div key={lesson.id} className="animate-slide-up" style={{ animationDelay: `${idx * 0.1}s` }}>
            <LessonCard 
              lesson={lesson} 
              onClick={() => setSelectedLesson(lesson)} 
            />
          </div>
        ))}
      </div>
    </div>
  );

// --- QUIZ VIEW ---
const QuizView = ({ updateProgress, progress }: { updateProgress: (pts: number) => void, progress: UserProgress }) => {
    const [selectedCategory, setSelectedCategory] = useState<QuizCategory | null>(null);
    const [quizIndex, setQuizIndex] = useState(0);
    const [showExplanation, setShowExplanation] = useState(false);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [textAnswer, setTextAnswer] = useState('');
    const [quizScore, setQuizScore] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [userAnswers, setUserAnswers] = useState<{questionId: number, isCorrect: boolean, userAnswer: any}[]>([]);

    const questions = selectedCategory ? selectedCategory.questions : [];
    const currentQuestion = questions[quizIndex];

    const handleCategorySelect = (category: QuizCategory) => {
      setSelectedCategory(category);
      setQuizIndex(0);
      setQuizScore(0);
      setIsFinished(false);
      setUserAnswers([]);
      setShowExplanation(false);
      setSelectedOption(null);
      setTextAnswer('');
    };

    const handleBackToCategories = () => {
      setSelectedCategory(null);
    };

    const handleMCQAnswer = (idx: number) => {
      if (selectedOption !== null || showExplanation) return;
      setSelectedOption(idx);
      setShowExplanation(true);
      
      const isCorrect = idx === currentQuestion.correctAnswer;
      if (isCorrect) {
        setQuizScore(s => s + 1);
        updateProgress(10);
      }
      
      setUserAnswers([...userAnswers, { 
        questionId: currentQuestion.id, 
        isCorrect, 
        userAnswer: currentQuestion.options ? currentQuestion.options[idx] : idx 
      }]);
    };

    const handleTextAnswer = () => {
       if (!textAnswer.trim() || showExplanation) return;
       setShowExplanation(true);
       
       const isCorrect = textAnswer.toLowerCase().trim() === (currentQuestion.correctAnswer as string).toLowerCase().trim();
       if (isCorrect) {
          setQuizScore(s => s + 1);
          updateProgress(15); // More points for harder text questions
       }

       setUserAnswers([...userAnswers, { 
          questionId: currentQuestion.id, 
          isCorrect, 
          userAnswer: textAnswer 
       }]);
    };

    const nextQuestion = () => {
      if (quizIndex + 1 >= questions.length) {
        setIsFinished(true);
      } else {
        setQuizIndex(i => i + 1);
        setSelectedOption(null);
        setTextAnswer('');
        setShowExplanation(false);
      }
    };

    // --- RENDER: QUIZ HOME (CATEGORIES) ---
    if (!selectedCategory) {
      return (
        <div className="pb-24 pt-6 px-6 md:px-0 max-w-6xl mx-auto animate-fade-in">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Quiz Center</h1>
            <p className="text-gray-500 mt-1">Select a topic to test your knowledge</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {QUIZ_CATEGORIES.map((cat, idx) => (
              <button 
                key={cat.id}
                onClick={() => handleCategorySelect(cat)}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all text-left flex flex-col group h-full"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-rwanda-blue flex items-center justify-center group-hover:scale-110 transition-transform">
                    <cat.icon size={24} />
                  </div>
                  {progress.quizScores?.[cat.id] !== undefined && (
                     <div className="flex items-center gap-1 text-xs font-bold text-rwanda-green bg-green-50 px-2 py-1 rounded-full">
                        <Trophy size={12} />
                        {Math.round((progress.quizScores[cat.id] / cat.questions.length) * 100)}%
                     </div>
                  )}
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{cat.title}</h3>
                <p className="text-sm text-gray-500 mb-4 flex-1">{cat.description}</p>
                <div className="flex items-center gap-2 text-xs font-medium text-gray-400 mt-auto">
                  <span className="bg-gray-100 px-2 py-1 rounded">{cat.questions.length} Questions</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      );
    }

    // --- RENDER: RESULTS SCREEN ---
    if (isFinished) {
      return (
        <div className="h-full flex flex-col items-center justify-center p-6 pb-24 animate-fade-in">
          <div className="max-w-2xl w-full bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
            <div className="w-24 h-24 bg-rwanda-yellow rounded-full flex items-center justify-center mb-6 shadow-lg animate-bounce-gentle mx-auto">
              <Trophy size={48} className="text-rwanda-blue" />
            </div>
            <h2 className="text-2xl font-bold text-center text-gray-900">Quiz Completed!</h2>
            <p className="text-gray-500 mt-2 text-lg text-center">
              You scored <span className="font-bold text-rwanda-blue">{quizScore}</span> out of {questions.length} in {selectedCategory.title}
            </p>
            
            <div className="w-full bg-gray-100 rounded-full h-4 mt-8 mb-8 overflow-hidden inner-shadow">
              <div 
                className={`h-4 rounded-full transition-all duration-1000 ease-out ${
                   (quizScore / questions.length) > 0.7 ? 'bg-rwanda-green' : 'bg-rwanda-yellow'
                }`}
                style={{ width: `${(quizScore / questions.length) * 100}%` }}
              ></div>
            </div>

            <div className="max-h-60 overflow-y-auto mb-8 space-y-3 pr-2 custom-scrollbar">
               {questions.map((q, idx) => {
                 const isCorrect = userAnswers.find(a => a.questionId === q.id)?.isCorrect;
                 return (
                   <div key={q.id} className={`p-3 rounded-lg flex items-center gap-3 text-sm ${isCorrect ? 'bg-green-50 text-green-900' : 'bg-red-50 text-red-900'}`}>
                      {isCorrect ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                      <span className="truncate flex-1">{q.question}</span>
                   </div>
                 );
               })}
            </div>

            <div className="flex gap-4">
              <button 
                onClick={handleBackToCategories}
                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-colors"
              >
                Choose Another Topic
              </button>
              <button 
                onClick={() => {
                  setQuizIndex(0);
                  setQuizScore(0);
                  setUserAnswers([]);
                  setIsFinished(false);
                  setShowExplanation(false);
                }}
                className="flex-1 py-3 bg-rwanda-blue text-white rounded-xl font-bold shadow-lg hover:bg-blue-600 transition-colors"
              >
                Retry Quiz
              </button>
            </div>
          </div>
        </div>
      );
    }

    // --- RENDER: ACTIVE QUIZ ---
    return (
      <div className="p-6 md:p-0 max-w-2xl mx-auto pb-24 pt-4 animate-fade-in">
        <button 
          onClick={handleBackToCategories}
          className="mb-6 text-sm text-gray-500 hover:text-rwanda-blue flex items-center gap-1 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Categories
        </button>

        <div className="flex justify-between items-end mb-8">
          <div>
            <span className="text-xs font-bold text-gray-400 tracking-wider uppercase">
              {selectedCategory.title} • Q{quizIndex + 1}/{questions.length}
            </span>
            <div className="w-48 h-1.5 bg-gray-200 rounded-full mt-2 overflow-hidden">
               <div className="h-full bg-rwanda-blue transition-all duration-500" style={{ width: `${((quizIndex + 1) / questions.length) * 100}%` }}></div>
            </div>
          </div>
          <div className="bg-blue-50 px-3 py-1 rounded-lg flex gap-2 items-center">
            <span className="text-xs font-bold text-gray-400 uppercase">{currentQuestion.difficulty}</span>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 mb-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-rwanda-yellow"></div>
          <h3 className="text-xl md:text-2xl font-semibold text-gray-800 leading-snug">
            {currentQuestion.question}
          </h3>
        </div>

        {/* Question Inputs */}
        <div className="space-y-4">
          {currentQuestion.type === 'MCQ' && currentQuestion.options && (
            currentQuestion.options.map((opt, idx) => {
              let stateClass = "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 shadow-sm";
              if (selectedOption !== null) {
                if (idx === currentQuestion.correctAnswer) stateClass = "bg-green-50 border-green-500 text-green-800 ring-1 ring-green-500";
                else if (idx === selectedOption) stateClass = "bg-red-50 border-red-500 text-red-800 ring-1 ring-red-500";
                else stateClass = "bg-gray-50 border-gray-100 text-gray-400 opacity-50";
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleMCQAnswer(idx)}
                  disabled={selectedOption !== null}
                  className={`w-full p-5 rounded-xl border-2 text-left text-base font-medium transition-all duration-200 ${stateClass} flex justify-between items-center group`}
                >
                  <span>{opt}</span>
                  {selectedOption !== null && idx === currentQuestion.correctAnswer && <CheckCircle2 size={24} className="text-green-600 animate-bounce" />}
                  {selectedOption !== null && idx === selectedOption && idx !== currentQuestion.correctAnswer && <XCircle size={24} className="text-red-600" />}
                  {selectedOption === null && <div className="w-4 h-4 rounded-full border-2 border-gray-300 group-hover:border-rwanda-blue"></div>}
                </button>
              );
            })
          )}

          {currentQuestion.type === 'TRUE_FALSE' && (
             <div className="flex gap-4">
               {['True', 'False'].map((opt) => {
                 const isTrue = opt === 'True';
                 const correctAnswerString = currentQuestion.correctAnswer as string;
                 const isCorrect = opt === correctAnswerString;
                 const isSelected = selectedOption === (isTrue ? 1 : 0);
                 
                 let stateClass = "bg-white border-gray-200 hover:bg-gray-50";
                 if (showExplanation) {
                    if (isCorrect) stateClass = "bg-green-50 border-green-500 text-green-800";
                    else if (isSelected) stateClass = "bg-red-50 border-red-500 text-red-800";
                    else stateClass = "opacity-50";
                 }

                 return (
                   <button
                     key={opt}
                     onClick={() => {
                        setSelectedOption(isTrue ? 1 : 0);
                        setShowExplanation(true);
                        if (isCorrect) {
                           setQuizScore(s => s + 1);
                           updateProgress(10);
                        }
                        setUserAnswers([...userAnswers, { questionId: currentQuestion.id, isCorrect, userAnswer: opt }]);
                     }}
                     disabled={showExplanation}
                     className={`flex-1 p-6 rounded-xl border-2 font-bold text-lg transition-all ${stateClass}`}
                   >
                     {opt}
                   </button>
                 );
               })}
             </div>
          )}

          {currentQuestion.type === 'FILL_BLANK' && (
            <div className="space-y-4">
               <input 
                 type="text" 
                 value={textAnswer}
                 onChange={(e) => setTextAnswer(e.target.value)}
                 disabled={showExplanation}
                 placeholder="Type your answer here..."
                 className={`w-full p-5 rounded-xl border-2 bg-gray-50 outline-none text-lg transition-all ${
                    showExplanation 
                      ? (textAnswer.toLowerCase().trim() === (currentQuestion.correctAnswer as string).toLowerCase().trim() ? 'border-green-500 bg-green-50 text-green-900' : 'border-red-500 bg-red-50 text-red-900')
                      : 'border-gray-200 focus:border-rwanda-blue focus:bg-white'
                 }`}
               />
               {!showExplanation && (
                 <button 
                   onClick={handleTextAnswer}
                   disabled={!textAnswer.trim()}
                   className="w-full py-4 bg-rwanda-blue text-white rounded-xl font-bold shadow-lg hover:bg-blue-600 disabled:opacity-50 disabled:shadow-none"
                 >
                   Submit Answer
                 </button>
               )}
            </div>
          )}
        </div>

        {showExplanation && (
          <div className="mt-8 animate-slide-up">
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 text-gray-700 mb-6 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={18} className="text-rwanda-blue" />
                <span className="font-bold text-rwanda-blue uppercase text-sm tracking-wide">Historical Fact</span>
              </div>
              <p>{currentQuestion.explanation}</p>
            </div>
            <button 
              onClick={nextQuestion}
              className="w-full py-4 bg-rwanda-blue text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-600 hover:shadow-lg transition-all"
            >
              {quizIndex + 1 === questions.length ? 'Finish Quiz' : 'Next Question'} <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    );
  };

// --- AI TUTOR VIEW ---
const AiTutorView = () => {
    const [aiTopic, setAiTopic] = useState('');
    const [aiResponse, setAiResponse] = useState('');
    const [isAiLoading, setIsAiLoading] = useState(false);

    return (
    <div className="p-6 md:p-0 pt-4 max-w-3xl mx-auto pb-24 animate-fade-in">
      <div className="text-center mb-10">
        <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl mx-auto flex items-center justify-center shadow-xl transform -rotate-6 hover:rotate-0 transition-transform duration-500 mb-6">
          <Sparkles size={40} className="text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">AI Study Companion</h1>
        <p className="text-gray-500 mt-2 text-lg">Powered by Gemini • Your personal history expert</p>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-3xl shadow-lg border border-gray-100 mb-8">
        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">
          What do you want to learn today?
        </label>
        <div className="relative group">
          <input 
            type="text"
            value={aiTopic}
            onChange={(e) => setAiTopic(e.target.value)}
            placeholder="e.g., Explain the 1931 deposition of King Musinga"
            className="w-full p-5 bg-gray-50 rounded-2xl border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none transition-all pr-12 text-lg"
          />
          {aiTopic && (
            <button 
              onClick={() => setAiTopic('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-2"
            >
              <XCircle size={20} />
            </button>
          )}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <button 
            onClick={async () => {
              if (!aiTopic) return;
              setIsAiLoading(true);
              const result = await generateMnemonic(aiTopic);
              setAiResponse(result);
              setIsAiLoading(false);
            }}
            disabled={isAiLoading || !aiTopic}
            className="flex-1 py-4 bg-rwanda-blue text-white rounded-xl font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all disabled:opacity-50 disabled:transform-none"
          >
            {isAiLoading ? 'Thinking...' : 'Generate Mnemonic'}
          </button>
          
          <button 
            onClick={async () => {
              if (!aiTopic) return;
              setIsAiLoading(true);
              const result = await askHistoryTutor(aiTopic);
              setAiResponse(result);
              setIsAiLoading(false);
            }}
            disabled={isAiLoading || !aiTopic}
            className="flex-1 py-4 bg-white text-rwanda-blue border-2 border-rwanda-blue rounded-xl font-bold shadow-sm hover:bg-blue-50 active:scale-95 transition-all disabled:opacity-50 disabled:transform-none"
          >
            Explain Topic
          </button>
        </div>
      </div>

      {aiResponse && (
        <div className="bg-white p-8 rounded-3xl shadow-xl border-t-4 border-indigo-500 animate-slide-up relative">
          <button 
             onClick={() => setAiResponse('')}
             className="absolute top-6 right-6 text-gray-300 hover:text-gray-500 transition-colors"
          >
            <XCircle size={24} />
          </button>
          <div className="flex items-center gap-3 mb-4">
             <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
               <BrainCircuit size={20} />
             </div>
             <h3 className="text-sm font-bold text-indigo-900 uppercase tracking-wide">AI Tutor Response</h3>
          </div>
          <div className="prose prose-lg prose-indigo text-gray-700 whitespace-pre-wrap leading-relaxed">
            {aiResponse}
          </div>
          <div className="mt-6 pt-6 border-t border-gray-100 flex justify-end">
            <button className="text-sm flex items-center gap-2 text-gray-400 hover:text-indigo-600 transition-colors font-medium">
              <RefreshCw size={14} /> Regenerate Answer
            </button>
          </div>
        </div>
      )}
      
      {/* Suggestions */}
      {!aiResponse && (
        <div className="mt-8">
          <p className="text-sm text-center text-gray-400 mb-6 font-medium">Popular Topics</p>
          <div className="flex flex-wrap justify-center gap-3">
            {['1931 King Deposition', 'Hutu Manifesto', 'Ubudehe Values', 'Berlin Conference'].map(tag => (
              <button 
                key={tag}
                onClick={() => setAiTopic(tag)}
                className="px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-full text-sm font-semibold hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50 transition-all shadow-sm"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// --- LESSON DETAIL VIEW ---
const LessonDetailView = ({ selectedLesson, setSelectedLesson }: { selectedLesson: Lesson, setSelectedLesson: (l: Lesson | null) => void }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [speaking, setSpeaking] = useState(false);

    const speakText = (text: string) => {
      if ('speechSynthesis' in window) {
        if (speaking) {
          window.speechSynthesis.cancel();
          setSpeaking(false);
          return;
        }
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.onend = () => setSpeaking(false);
        window.speechSynthesis.speak(utterance);
        setSpeaking(true);
      } else {
        alert("Text-to-speech not supported in this browser.");
      }
    };

    useEffect(() => {
      return () => {
        window.speechSynthesis.cancel();
      };
    }, []);

    // Filter sections based on search
    const filteredSections = useMemo(() => {
      if (!searchTerm) return selectedLesson.sections;
      return selectedLesson.sections.filter(s => 
        s.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        s.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }, [selectedLesson, searchTerm]);
    
    return (
      <div className="bg-white md:rounded-2xl md:shadow-xl min-h-screen md:min-h-[80vh] md:my-6 md:mx-6 pb-24 md:pb-0 animate-slide-in-right overflow-hidden relative">
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-gray-100 z-30 px-6 py-4 flex flex-col md:flex-row md:items-center gap-4 shadow-sm">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <button 
              onClick={() => setSelectedLesson(null)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors group"
            >
              <ArrowLeft size={24} className="text-gray-600 group-hover:text-rwanda-blue" />
            </button>
            <div className="flex-1">
              <h2 className="font-bold text-lg md:text-xl text-gray-800 truncate">{selectedLesson.title}</h2>
              <p className="text-xs text-gray-500 hidden md:block">{selectedLesson.category} • {selectedLesson.duration}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
             <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Find in lesson..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-gray-50 rounded-lg text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rwanda-blue"
                />
             </div>
             <button 
                onClick={() => speakText(selectedLesson.description + " " + selectedLesson.sections.map(s => s.title + ". " + s.content).join(" "))}
                className={`p-2 rounded-lg transition-colors ${speaking ? 'bg-red-50 text-red-600' : 'bg-gray-50 text-gray-600 hover:bg-blue-50 hover:text-rwanda-blue'}`}
             >
               {speaking ? <Pause size={20} /> : <Volume2 size={20} />}
             </button>
          </div>
        </div>

        <div className="p-6 md:p-10 max-w-4xl mx-auto">
          <p className="text-gray-600 mb-10 text-lg leading-relaxed border-l-4 border-rwanda-yellow pl-4 bg-yellow-50/50 p-4 rounded-r-lg">
            {selectedLesson.description}
          </p>
          
          <div className="space-y-16">
            {filteredSections.map((section: LessonSection) => (
              <div key={section.id} className="animate-fade-in">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                   <div className="w-8 h-1 bg-rwanda-green rounded-full"></div>
                   {section.title}
                </h3>
                
                {/* Content Text */}
                <div className="prose prose-lg text-gray-600 mb-6 leading-relaxed">
                   {section.content}
                </div>

                {/* Rich Media: Images/Maps */}
                {(section.image || section.mapUrl) && (
                  <div className="my-6 rounded-xl overflow-hidden shadow-lg border border-gray-100 bg-gray-50">
                     <img 
                       src={section.mapUrl || section.image} 
                       alt={section.title} 
                       className="w-full h-auto max-h-96 object-cover hover:scale-105 transition-transform duration-700"
                     />
                     <div className="p-3 bg-gray-50 text-xs text-gray-500 text-center border-t border-gray-200">
                        {section.mapUrl ? 'Historical Map Visualization' : 'Historical Archive'}
                     </div>
                  </div>
                )}

                {/* Video Placeholder */}
                {section.videoUrl && (
                  <div className="my-6 rounded-xl overflow-hidden shadow-lg bg-black aspect-video flex items-center justify-center relative group cursor-pointer">
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all"></div>
                    <Play size={64} className="text-white opacity-80 group-hover:scale-110 transition-transform" fill="white" />
                    <span className="absolute bottom-4 left-4 text-white font-bold text-sm bg-black/50 px-3 py-1 rounded-full">Watch Video Lesson</span>
                  </div>
                )}

                {/* Timeline Events for this section */}
                {section.timelineEvents && (
                  <div className="mt-8 pl-4 border-l-2 border-rwanda-blue/20 space-y-8">
                     {section.timelineEvents.map((event, idx) => (
                       <div key={idx} className="relative pl-8 group">
                         {/* Dot */}
                         <div className="absolute -left-[9px] top-0 w-4 h-4 bg-white rounded-full border-4 border-rwanda-blue shadow-sm group-hover:scale-125 transition-transform duration-300"></div>
                         
                         <span className="inline-block text-sm font-bold text-rwanda-blue bg-blue-50 px-3 py-1 rounded-full mb-2 border border-blue-100">
                           {event.year}
                         </span>
                         
                         <h4 className="text-lg font-bold text-gray-800 mb-2">{event.title}</h4>
                         <p className="text-gray-600">{event.description}</p>
                         {event.image && (
                           <img src={event.image} alt={event.title} className="mt-3 rounded-lg w-full h-40 object-cover shadow-sm" />
                         )}
                       </div>
                     ))}
                  </div>
                )}
              </div>
            ))}

            {filteredSections.length === 0 && (
              <div className="text-center py-20 text-gray-400">
                <Search size={48} className="mx-auto mb-4 opacity-20" />
                <p>No sections found matching "{searchTerm}"</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
};

// --- MAIN APP COMPONENT ---
const App = () => {
  const [currentTab, setCurrentTab] = useState<Tab>(Tab.HOME);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [progress, setProgress] = useState<UserProgress>({
    badges: ['Newcomer'],
    points: 0,
    completedLessons: [],
    streak: 0,
    lastLogin: '',
    quizScores: {}
  });

  // --- Persistence & Streak Logic ---
  useEffect(() => {
    const saved = localStorage.getItem('rce-user-data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const today = new Date().toDateString();
        
        if (parsed.lastLogin !== today) {
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          
          if (parsed.lastLogin === yesterday.toDateString()) {
             parsed.streak = (parsed.streak || 0) + 1;
          } else {
             parsed.streak = 1;
          }
          parsed.lastLogin = today;
          localStorage.setItem('rce-user-data', JSON.stringify(parsed));
        }
        setProgress(parsed);
      } catch (e) {
        console.error("Failed to parse user data", e);
      }
    } else {
      // Initialize new user
      const initData: UserProgress = { 
        badges: ['Newcomer'], 
        points: 50, 
        completedLessons: [], 
        streak: 1, 
        lastLogin: new Date().toDateString(),
        quizScores: {}
      };
      setProgress(initData);
      localStorage.setItem('rce-user-data', JSON.stringify(initData));
    }
  }, []);

  const updateProgress = (newPoints: number) => {
    setProgress(prev => {
      const updated = { ...prev, points: prev.points + newPoints };
      localStorage.setItem('rce-user-data', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans text-gray-800">
      <Sidebar currentTab={currentTab} onTabChange={setCurrentTab} progress={progress} />
      
      <main className="flex-1 md:ml-64 relative overflow-y-auto h-screen">
        {/* Desktop Header */}
        <div className="hidden md:flex justify-between items-center py-6 px-10 sticky top-0 bg-gray-50/90 backdrop-blur-sm z-40">
           <h2 className="text-2xl font-bold text-gray-800">
             {currentTab === Tab.HOME && 'Dashboard'}
             {currentTab === Tab.LEARN && 'Library'}
             {currentTab === Tab.QUIZ && 'Assessment'}
             {currentTab === Tab.AI_TUTOR && 'AI Tutor'}
           </h2>
           <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 rounded-full bg-white border border-gray-200 text-sm focus:ring-2 focus:ring-rwanda-blue outline-none" />
              </div>
              <button className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-rwanda-blue transition-colors">
                <User size={20} />
              </button>
           </div>
        </div>

        <div className="p-0 md:px-10 md:pb-10">
          {/* Dynamic Content */}
          {selectedLesson ? (
            <LessonDetailView selectedLesson={selectedLesson} setSelectedLesson={setSelectedLesson} />
          ) : (
            <>
              {currentTab === Tab.HOME && (
                <HomeView 
                  progress={progress} 
                  setCurrentTab={setCurrentTab} 
                  setSelectedLesson={setSelectedLesson} 
                />
              )}
              {currentTab === Tab.LEARN && (
                <LearnView setSelectedLesson={setSelectedLesson} />
              )}
              {currentTab === Tab.QUIZ && (
                <QuizView updateProgress={updateProgress} progress={progress} />
              )}
              {currentTab === Tab.AI_TUTOR && <AiTutorView />}
            </>
          )}
        </div>
      </main>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <BottomNav currentTab={currentTab} onTabChange={setCurrentTab} />
      </div>
    </div>
  );
};

export default App;