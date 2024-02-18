import React, { useState ,useEffect} from 'react';
import './App.css';

const App = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [hintAvailable, setHintAvailable] = useState(true);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const questions = [
    {
      question: 'What is the Spanish word for "hello"?',
      options: ['Hola', 'Adiós', 'Gracias', 'Por favor'],
      correctAnswer: 'Hola',
      explanation: 'Hola is the Spanish word for hello.'
    },
    {
      question: 'What is the French word for "thank you"?',
      options: ['Bonjour', 'Merci', 'Oui', 'Non'],
      correctAnswer: 'Merci',
      explanation: 'Merci is the French word for thank you.'
    },
    {
      question: 'What is the German word for "goodbye"?',
      options: ['Hallo', 'Tschüss', 'Bitte', 'Danke'],
      correctAnswer: 'Tschüss',
      explanation: 'Tschüss is the German word for "goodbye." It is a casual way to say goodbye to someone.'
    },
    {
      question: 'What is the Italian word for "yes"?',
      options: ['Ciao', 'Si', 'Grazie', 'Per favore'],
      correctAnswer: 'Si',
      explanation: 'Si is the Italian word for "yes." It is used to affirm or agree with something.'
    },
    {
      question: 'What is the English word for "विश्वास"?',
      options: ['Trust', 'Hope', 'Faith', 'Belief'],
      correctAnswer: 'Trust',
      explanation: 'Trust is the English word for "विश्वास." It refers to a firm belief in the reliability, truth, or ability of someone or something.'
    },
    {
      question: 'What is the Hindi word for "astronomy"?',
      options: ['खगोल विज्ञान', 'भूगोल', 'भौतिकी', 'रसायन विज्ञान'],
      correctAnswer: 'खगोल विज्ञान',
      explanation: 'खगोल विज्ञान is the Hindi word for "astronomy." It is the scientific study of celestial objects and phenomena.'
    },
    {
      question: 'What is the English word for "संघर्ष"?',
      options: ['Struggle', 'Conflict', 'Fight', 'Challenge'],
      correctAnswer: 'Struggle',
      explanation: 'Struggle is the English word for "संघर्ष." It refers to making forceful or violent efforts to get free of restraint or constriction.'
    },
    {
      question: 'What is the Hindi word for "technology"?',
      options: ['प्रौद्योगिकी', 'विज्ञान', 'गणित', 'वाणिज्य'],
      correctAnswer: 'प्रौद्योगिकी',
      explanation: 'प्रौद्योगिकी is the Hindi word for "technology." It refers to the application of scientific knowledge for practical purposes.'
    },
    {
      question: 'What is the English word for "उद्यान"?',
      options: ['Garden', 'Park', 'Forest', 'Zoo'],
      correctAnswer: 'Park',
      explanation: 'Park is the English word for "उद्यान." It refers to a public green space, often featuring grass, trees, and recreational facilities.'
    },
    {
      question: 'What is the Hindi word for "ambulance"?',
      options: ['रेलगाड़ी', 'गाड़ी', 'एंबुलेंस', 'हवाई जहाज़'],
      correctAnswer: 'एंबुलेंस',
      explanation: 'एंबुलेंस is the Hindi word for "ambulance." It is a vehicle equipped for transporting sick or injured people to a hospital.'
    },
    {
      question: 'What is the English word for "मंजिल"?',
      options: ['Destination', 'Journey', 'Travel', 'Trip'],
      correctAnswer: 'Destination',
      explanation: 'Destination is the English word for "मंजिल." It refers to the place to which someone or something is going or being sent.'
    },
    {
      question: 'What is the Hindi word for "butterfly"?',
      options: ['मछली', 'तितली', 'केक', 'कुत्ता'],
      correctAnswer: 'तितली',
      explanation: 'तितली is the Hindi word for "butterfly." It is an insect with large, often colorful wings that flutter in flight.'
    },
    {
      question: 'What is the English word for "प्राणी"?',
      options: ['Animal', 'Plant', 'Insect', 'Microorganism'],
      correctAnswer: 'Animal',
      explanation: 'Animal is the English word for "प्राणी." It refers to a living organism that feeds on organic matter, typically having specialized sense organs and nervous systems.'
    },
    {
      question: 'What is the Hindi word for "volcano"?',
      options: ['ज्वालामुखी', 'बांध', 'पहाड़', 'समुद्र'],
      correctAnswer: 'ज्वालामुखी',
      explanation: 'ज्वालामुखी is the Hindi word for "volcano." It is a rupture in the Earth\'s crust that allows lava, ash, and gases to escape from below the surface.'
    },
    {
      question: 'What is the English word for "बच्चा"?',
      options: ['Child', 'Adult', 'Elderly', 'Teenager'],
      correctAnswer: 'Child',
      explanation: 'Child is the English word for "बच्चा." It refers to a young human being below the age of puberty or below the legal age of majority.'
    },
    {
      question: 'What is the Hindi word for "moon"?',
      options: ['चाँद', 'सूरज', 'तारा', 'ग्रह'],
      correctAnswer: 'चाँद',
      explanation: 'चाँद is the Hindi word for "moon." It is Earth\'s only natural satellite and is the fifth-largest satellite in the Solar System.'
    },
    {
      question: 'What is the English word for "आकाश"?',
      options: ['Sky', 'Earth', 'Ocean', 'Sun'],
      correctAnswer: 'Sky',
      explanation: 'Sky is the English word for "आकाश." It refers to the atmosphere above the Earth, where clouds, stars, and celestial bodies are seen.'
    },
    {
      question: 'What is the Hindi word for "technology"?',
      options: ['प्रौद्योगिकी', 'विज्ञान', 'कला', 'साहित्य'],
      correctAnswer: 'प्रौद्योगिकी',
      explanation: 'प्रौद्योगिकी is the Hindi word for "technology." It refers to the application of scientific knowledge for practical purposes.'
    },
    {
      question: 'What is the English word for "विचार"?',
      options: ['Thought', 'Action', 'Feeling', 'Emotion'],
      correctAnswer: 'Thought',
      explanation: 'Thought is the English word for "विचार." It refers to the process of considering or reasoning about something.'
    },
    {
      question: 'What is the Hindi word for "tiger"?',
      options: ['शेर', 'बाघ', 'हाथी', 'सिंह'],
      correctAnswer: 'बाघ',
      explanation: 'बाघ is the Hindi word for "tiger." It is a large carnivorous feline mammal native to Asia.'
    },
    {
      question: 'What is the English word for "संगीत"?',
      options: ['Music', 'Dance', 'Art', 'Poetry'],
      correctAnswer: 'Music',
      explanation: 'Music is the English word for "संगीत." It refers to the art of arranging sounds in time to produce a composition with harmony, melody, and rhythm.'
    },
    {
      question: 'What is the Hindi word for "democracy"?',
      options: ['लोकतंत्र', 'राजतंत्र', 'समाजवाद', 'परिवार'],
      correctAnswer: 'लोकतंत्र',
      explanation: 'लोकतंत्र is the Hindi word for "democracy." It is a system of government in which the people have the authority to choose their leaders and participate in decision-making.'
    },
    {
      question: 'What is the English word for "विश्व"?',
      options: ['World', 'Universe', 'Galaxy', 'Planet'],
      correctAnswer: 'World',
      explanation: 'World is the English word for "विश्व." It refers to the entirety of human civilization, society, and the natural environment.'
    },
    {
      question: 'What is the Hindi word for "computer"?',
      options: ['कंप्यूटर', 'संगणक', 'गणना', 'सूचना'],
      correctAnswer: 'कंप्यूटर',
      explanation: 'कंप्यूटर is the Hindi word for "computer." It is an electronic device that processes data and performs tasks according to instructions.'
    },
    {
      question: 'What is the English word for "स्वतंत्रता"?',
      options: ['Freedom', 'Equality', 'Justice', 'Democracy'],
      correctAnswer: 'Freedom',
      explanation: 'Freedom is the English word for "स्वतंत्रता." It refers to the power or right to act, speak, or think as one wants without hindrance or restraint.'
    },
    {
      question: 'What is the Hindi word for "community"?',
      options: ['समुदाय', 'विद्यालय', 'सरकार', 'व्यापार'],
      correctAnswer: 'समुदाय',
      explanation: 'समुदाय is the Hindi word for "community." It refers to a group of people living in the same place or having a particular characteristic in common.'
    },
    {
      question: 'What is the English word for "सामूहिक"?',
      options: ['Collective', 'Individual', 'Personal', 'Private'],
      correctAnswer: 'Collective',
      explanation: 'Collective is the English word for "सामूहिक." It refers to done by people acting as a group or a whole, rather than by individuals.'
    },
    {
      question: 'What is the Hindi word for "relationship"?',
      options: ['संबंध', 'समस्या', 'स्थिति', 'समर्थन'],
      correctAnswer: 'संबंध',
      explanation: 'संबंध is the Hindi word for "relationship." It refers to the way in which two or more people or things are connected, or the state of being connected.'
    },
    {
      question: 'What is the English word for "संविदा"?',
      options: ['Conscience', 'Confidence', 'Consciousness', 'Convenience'],
      correctAnswer: 'Conscience',
      explanation: 'Conscience is the English word for "संविदा." It refers to a person\'s moral sense of right and wrong, viewed as acting as a guide to one\'s behavior.'
    },
    {
      question: 'What is the Hindi word for "compassion"?',
      options: ['दया', 'क्रोध', 'घृणा', 'ईर्ष्या'],
      correctAnswer: 'दया',
      explanation: 'दया is the Hindi word for "compassion." It refers to sympathetic pity and concern for the sufferings or misfortunes of others.'
    },
    {
      question: 'What is the English word for "संयम"?',
      options: ['Self-control', 'Self-confidence', 'Self-esteem', 'Self-awareness'],
      correctAnswer: 'Self-control',
      explanation: 'Self-control is the English word for "संयम." It refers to the ability to control oneself, in particular one\'s emotions and desires, in difficult situations.'
    },
    {
      question: 'What is the Hindi word for "empathy"?',
      options: ['सहानुभूति', 'आत्म-विश्वास', 'आत्मविश्वास', 'स्वयं-ज्ञान'],
      correctAnswer: 'सहानुभूति',
      explanation: 'सहानुभूति is the Hindi word for "empathy." It refers to the ability to understand and share the feelings of another.'
    },
    {
      question: 'What is the English word for "समृद्धि"?',
      options: ['Prosperity', 'Poverty', 'Success', 'Failure'],
      correctAnswer: 'Prosperity',
      explanation: 'Prosperity is the English word for "समृद्धि." It refers to the state of being successful or thriving, especially in financial terms.'
    },
    {
      question: 'What is the Hindi word for "integrity"?',
      options: ['अखंडता', 'विचार', 'आत्मविश्वास', 'संबंध'],
      correctAnswer: 'अखंडता',
      explanation: 'अखंडता is the Hindi word for "integrity." It refers to the quality of being honest and having strong moral principles.'
    },
    {
      question: 'What is the English word for "स्वाधीनता"?',
      options: ['Independence', 'Dependence', 'Interdependence', 'Freedom'],
      correctAnswer: 'Independence',
      explanation: 'Independence is the English word for "स्वाधीनता." It refers to the state of being free from outside control or support.'
    },
    {
      question: 'What is the Hindi word for "justice"?',
      options: ['न्याय', 'अन्याय', 'धर्म', 'शांति'],
      correctAnswer: 'न्याय',
      explanation: 'न्याय is the Hindi word for "justice." It refers to the quality of being fair and reasonable, especially in the administration of law.'
    },
    {
      question: 'What is the English word for "सम्मान"?',
      options: ['Respect', 'Disrespect', 'Honour', 'Dishonour'],
      correctAnswer: 'Respect',
      explanation: 'Respect is the English word for "सम्मान." It refers to a feeling of admiration or deference toward someone or something.'
    },
    {
      question: 'What is the Hindi word for "equality"?',
      options: ['समानता', 'असमानता', 'विभाजन', 'बराबरी'],
      correctAnswer: 'समानता',
      explanation: 'समानता is the Hindi word for "equality." It refers to the state of being equal, especially in status, rights, and opportunities.'
    },
    {
      question: 'What is the English word for "सदभाव"?',
      options: ['Goodwill', 'Ill will', 'Friendliness', 'Hostility'],
      correctAnswer: 'Goodwill',
      explanation: 'Goodwill is the English word for "सदभाव." It refers to a friendly or helpful attitude toward others, especially in business or politics.'
    },
    {
      question: 'What is the Hindi word for "tolerance"?',
      options: ['सहिष्णुता', 'असहिष्णुता', 'संयम', 'संतुलन'],
      correctAnswer: 'सहिष्णुता',
      explanation: 'सहिष्णुता is the Hindi word for "tolerance." It refers to the ability or willingness to tolerate the existence of opinions or behaviors that one dislikes or disagrees with.'
    },
    {
      question: 'What is the English word for "स्वाभिमान"?',
      options: ['Pride', 'Humility', 'Arrogance', 'Modesty'],
      correctAnswer: 'Pride',
      explanation: 'Pride is the English word for "स्वाभिमान." It refers to a feeling of deep pleasure or satisfaction derived from one\'s own achievements, the achievements of those with whom one is closely associated, or from qualities or possessions that are widely admired.'
    },
    {
      question: 'What is the Hindi word for "empathy"?',
      options: ['सहानुभूति', 'आत्म-विश्वास', 'आत्मविश्वास', 'स्वयं-ज्ञान'],
      correctAnswer: 'सहानुभूति',
      explanation: 'सहानुभूति is the Hindi word for "empathy." It refers to the ability to understand and share the feelings of another.'
    },
    {
      question: 'What is the English word for "साहस"?',
      options: ['Courage', 'Fear', 'Weakness', 'Timidity'],
      correctAnswer: 'Courage',
      explanation: 'Courage is the English word for "साहस." It refers to the ability to do something that frightens one, or strength in the face of pain or grief.'
    },
    {
      question: 'What is the Hindi word for "perseverance"?',
      options: ['सहनशीलता', 'धैर्य', 'उत्साह', 'समर्थन'],
      correctAnswer: 'धैर्य',
      explanation: 'धैर्य is the Hindi word for "perseverance." It refers to steadfastness in doing something despite difficulty or delay in achieving success.'
    },
    // Add more toughest questions here...
    
    // Add more tough questions here...
    
    // Add more tough questions here...
    
    // Add more toughest questions here...
    
    // Add more social life-related questions here...
    
    // Add more tough questions here...
    
    // Add more tough questions here...
    
    // Add more tough questions here...
    
    // Add more tough questions here...
    
    // Add more tough questions here...
    
    // Add more questions as needed
  ];
  useEffect(() => {
    let timer;
    if (quizStarted && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000); // Update every second
    } else if (timeLeft === 0) {
      endQuiz();
    }
    return () => clearTimeout(timer); // Cleanup timer on unmount or quiz end
  }, [quizStarted, timeLeft]);

  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowExplanation(false);
    setHintAvailable(true);
  };

  const handleAnswer = (selectedAnswer) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
    setShowExplanation(true);
    setHintAvailable(false);
  };

  const goToNextQuestion = () => {
    setShowExplanation(false);
    setHintAvailable(true);
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      endQuiz();
    }
  };

  const endQuiz = () => {
    setQuizStarted(false);
    // You can perform any end of quiz actions here
  };


  return (
    <div className="App">
      <h1>Language Learning Quiz</h1>
      {!quizStarted ? (
        <div>
          <button onClick={startQuiz}>Start Quiz</button>
        </div>
      ) : (
        <div>
          <h2>Question {currentQuestionIndex + 1}/{questions.length}</h2>
          <p>{questions[currentQuestionIndex].question}</p>
          <ul>
            {questions[currentQuestionIndex].options.map((option, index) => (
              <li key={index}>
                <button disabled={!hintAvailable} onClick={() => handleAnswer(option)}>{option}</button>
              </li>
            ))}
          </ul>
          {showExplanation && (
            <div>
              <p>{questions[currentQuestionIndex].explanation}</p>
              <button onClick={goToNextQuestion}>Next Question</button>
            </div>
          )}
          <p>Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</p>
          <p>Score: {score}</p>
        </div>
      )}
    </div>
  );
};

export default App;
