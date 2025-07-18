import { useState, useEffect } from "react";

// Define interface for timeRemaining state
interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const ExamPortal: React.FC = () => {
  // Set exam date and time (YYYY, MM-1, DD, HH, MM)
  const examDateTime: Date = new Date(2025, 6, 18, 11, 15); // July 18, 2025 at 11:15 AM
  const examLink: string = "https://forms.gle/iDWNrp94pvMUFNu77";
  const examDuration: string = "60 minutes";
  const examDurationMs: number = 60 * 60 * 1000; // 60 minutes in milliseconds

  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining | null>(
    null
  );
  const [isExamActive, setIsExamActive] = useState<boolean>(false);
  const [isExamOver, setIsExamOver] = useState<boolean>(false);

  // Calculate time remaining until exam or during exam
  useEffect(() => {
    const timer = setInterval(() => {
      const now: Date = new Date();
      setCurrentTime(now);

      // Calculate time difference
      const diff: number = examDateTime.getTime() - now.getTime();

      if (diff < 0) {
        // Exam has started, check if it's over
        const timeSinceStart: number = Math.abs(diff);
        if (timeSinceStart > examDurationMs) {
          setIsExamOver(true);
          setIsExamActive(false);
          clearInterval(timer);
          return;
        } else {
          setIsExamActive(true);
          setIsExamOver(false);
          // Calculate remaining exam time
          const remainingExamTime: number = examDurationMs - timeSinceStart;
          const minutes: number = Math.floor(
            (remainingExamTime % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds: number = Math.floor(
            (remainingExamTime % (1000 * 60)) / 1000
          );
          setTimeRemaining({ days: 0, hours: 0, minutes, seconds });
        }
      } else {
        // Exam hasn't started yet
        const days: number = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours: number = Math.floor(
          (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes: number = Math.floor(
          (diff % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds: number = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeRemaining({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [examDateTime, examDurationMs]);

  // Format date for display
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl p-1 inline-block shadow-lg">
            <div className="bg-white rounded-xl px-8 py-6">
              <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-600 to-indigo-700 bg-clip-text text-transparent">
                Topview Academy Web Design Fundamentals Exam
              </h1>
              <p className="text-gray-600 mt-3 text-lg">
                Showcase your design skills and knowledge!
              </p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="md:flex">
            {/* Left Section */}
            <div className="md:w-3/5 p-8">
              <div className="flex items-center mb-6">
                <div className="bg-yellow-100 p-3 rounded-full mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-yellow-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Exam Instructions
                </h2>
              </div>

              <div className="space-y-6">
                <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-500">
                  <h3 className="font-bold text-lg text-gray-800 mb-2">
                    Important Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Exam Date:</p>
                      <p className="font-bold text-purple-700">
                        {formatDate(examDateTime)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Start Time:</p>
                      <p className="font-bold text-purple-700">
                        {formatTime(examDateTime)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Duration:</p>
                      <p className="font-bold text-purple-700">
                        {examDuration}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Current Time:</p>
                      <p className="font-bold text-purple-700">
                        {formatTime(currentTime)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-bold text-gray-800">Before You Begin:</h3>
                  <ol className="space-y-3 list-decimal pl-5">
                    <li className="text-gray-700">
                      Make sure you have a stable internet connection
                    </li>
                  </ol>
                </div>

                <div className="space-y-4">
                  <h3 className="font-bold text-gray-800">Exam Guidelines:</h3>
                  <ul className="space-y-3 list-disc pl-5">
                    <li className="text-gray-700">
                      Read each question carefully before answering
                    </li>
                    <li className="text-gray-700">
                      Answer all questions to the best of your ability
                    </li>
                    <li className="text-gray-700">
                      Double-check your answers before submitting
                    </li>
                  </ul>
                </div>

                <div className="bg-green-50 rounded-xl p-4 border-l-4 border-green-500">
                  <h3 className="font-bold text-gray-800 mb-2">Good Luck!</h3>
                  <p className="text-gray-700">
                    You've learned all that is required to take this exam. Take
                    a deep breath and do your best!
                  </p>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="md:w-2/5 bg-gradient-to-b from-indigo-500 to-purple-600 p-8 text-white">
              <div className="flex flex-col h-full">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">Exam Status</h2>
                  {isExamOver ? (
                    <div className="bg-red-400 bg-opacity-30 rounded-xl p-4 mb-6">
                      <h3 className="font-bold text-xl mb-2">Exam Completed</h3>
                      <p className="opacity-90">The exam period has ended.</p>
                    </div>
                  ) : isExamActive ? (
                    <div className="bg-green-400 bg-opacity-30 rounded-xl p-4 mb-6">
                      <h3 className="font-bold text-xl mb-2">Exam Active</h3>
                      <p className="opacity-90">You can now start the exam.</p>
                    </div>
                  ) : (
                    <div className="bg-yellow-400 bg-opacity-30 rounded-xl p-4 mb-6">
                      <h3 className="font-bold text-xl mb-2">
                        Exam Not Started
                      </h3>
                      <p className="opacity-90">The exam will start soon.</p>
                    </div>
                  )}
                  <div className="text-center">
                    <h3 className="font-bold mb-3">Time Until Exam:</h3>
                    {isExamOver ? (
                      <div className="text-xl font-bold bg-red-500 bg-opacity-20 py-4 rounded-xl">
                        Exam Completed
                      </div>
                    ) : isExamActive ? (
                      <div className="text-xl font-bold bg-green-500 bg-opacity-20 py-4 rounded-xl">
                        Exam In Progress
                        {timeRemaining && (
                          <div className="text-sm mt-2">
                            Time Remaining: {timeRemaining.minutes}m{" "}
                            {timeRemaining.seconds}s
                          </div>
                        )}
                      </div>
                    ) : (
                      timeRemaining && (
                        <div className="grid grid-cols-4 gap-2">
                          <div className="bg-indigo-600 bg-opacity-50 rounded-lg p-2">
                            <div className="text-2xl font-bold">
                              {timeRemaining.days}
                            </div>
                            <div className="text-xs opacity-80">DAYS</div>
                          </div>
                          <div className="bg-indigo-600 bg-opacity-50 rounded-lg p-2">
                            <div className="text-2xl font-bold">
                              {timeRemaining.hours}
                            </div>
                            <div className="text-xs opacity-80">HOURS</div>
                          </div>
                          <div className="bg-indigo-600 bg-opacity-50 rounded-lg p-2">
                            <div className="text-2xl font-bold">
                              {timeRemaining.minutes}
                            </div>
                            <div className="text-xs opacity-80">MINUTES</div>
                          </div>
                          <div className="bg-indigo-600 bg-opacity-50 rounded-lg p-2">
                            <div className="text-2xl font-bold">
                              {timeRemaining.seconds}
                            </div>
                            <div className="text-xs opacity-80">SECONDS</div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div className="flex-grow flex items-center justify-center">
                  {isExamOver ? (
                    <div className="bg-gray-400 text-white rounded-xl py-4 px-6 text-center font-bold text-xl w-full max-w-xs mx-auto">
                      Exam Completed
                    </div>
                  ) : isExamActive ? (
                    <a
                      href={examLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full max-w-xs mx-auto"
                    >
                      <div className="bg-white text-indigo-600 rounded-xl py-4 px-6 text-center font-bold text-xl transform transition-all hover:scale-105 hover:shadow-lg active:scale-95">
                        Start Exam Now
                        <div className="mt-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8 mx-auto text-purple-500 animate-pulse"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                      </div>
                    </a>
                  ) : (
                    <button
                      className="bg-gray-300 text-gray-500 rounded-xl py-4 px-6 text-center font-bold text-xl w-full max-w-xs mx-auto cursor-not-allowed"
                      disabled
                    >
                      Exam Not Started
                      <div className="mt-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8 mx-auto text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-600">
          <p>© 2025 Topview Academy. All rights reserved.</p>
          <p className="mt-2 text-sm">Good luck on your exam! .</p>
        </footer>
      </div>
    </div>
  );
};

export default ExamPortal;
