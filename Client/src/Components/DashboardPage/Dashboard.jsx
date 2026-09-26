import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpen,
  faPlay,
  faFire,
  faClock,
  faArrowRight,
  faCheckCircle,
  faChevronRight,
  faPlus,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";

const stats = [
  {
    title: "Words Learned",
    value: "248",
    change: "+18 this week",
    icon: faBookOpen,
  },
  {
    title: "Videos Watched",
    value: "18",
    change: "+4 this week",
    icon: faPlay,
  },
  {
    title: "Day Streak",
    value: "7",
    change: "Keep it going!",
    icon: faFire,
  },
  {
    title: "Learning Time",
    value: "12h 34m",
    change: "+2h this week",
    icon: faClock,
  },
];

const reviewWords = [
  {
    word: "Resilient",
    meaning: "Able to recover quickly",
  },
  {
    word: "Implement",
    meaning: "Put something into action",
  },
  {
    word: "Ubiquitous",
    meaning: "Present or found everywhere",
  },
];

const recentWords = [
  {
    word: "Resilient",
    type: "Adjective",
    meaning: "Able to recover quickly from difficulties.",
  },
  {
    word: "Implement",
    type: "Verb",
    meaning: "To put a plan or idea into action.",
  },
  {
    word: "Ubiquitous",
    type: "Adjective",
    meaning: "Present or found everywhere.",
  },
  {
    word: "Concise",
    type: "Adjective",
    meaning: "Giving information clearly in few words.",
  },
];

const weeklyActivity = [
  { day: "Mon", value: 35 },
  { day: "Tue", value: 60 },
  { day: "Wed", value: 45 },
  { day: "Thu", value: 80 },
  { day: "Fri", value: 55 },
  { day: "Sat", value: 90 },
  { day: "Sun", value: 40 },
];

const Dashboard = () => {
  return (
    <main className="min-h-screen bg-[#05051A] text-[#F8F7FF]">
      <div className="mx-auto max-w-[1500px] px-5 py-8 sm:px-8 lg:px-10 lg:py-10">

        {/* =====================================================
            WELCOME
        ====================================================== */}

        <section className="mb-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">

            <div>
              <div className="mb-3 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#B794F6] shadow-[0_0_12px_rgba(167,139,250,0.8)]" />

                <p className="text-sm font-medium text-[#B794F6]">
                  Keep learning
                </p>
              </div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-[42px]">
                Good evening, Krushna
              </h1>

              <p className="mt-2 text-sm text-[#8490B0] sm:text-base">
                Continue building your vocabulary, one word at a time.
              </p>
            </div>

            <button
              className="
                flex w-fit items-center gap-2
                rounded-xl
                bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6]
                px-5 py-3
                text-sm font-semibold text-white
                shadow-[0_8px_30px_rgba(124,58,237,0.25)]
                transition
                hover:scale-[1.02]
                hover:from-[#8B5CF6]
                hover:to-[#9333EA]
              "
            >
              <FontAwesomeIcon icon={faPlus} />

              Add New Video
            </button>

          </div>
        </section>

        {/* =====================================================
            STATS
        ====================================================== */}

        <section className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">

          {stats.map((stat) => (
            <div
              key={stat.title}
              className="
                rounded-2xl
                border border-[#17133A]
                bg-[#090820]
                p-5
                transition
                duration-300
                hover:border-[#2A2059]
                hover:bg-[#0B0925]
              "
            >
              <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-xl bg-[#7C3AED]/10">
                <FontAwesomeIcon
                  icon={stat.icon}
                  className="text-[#A78BFA]"
                />
              </div>

              <p className="text-xs text-[#7180A3] sm:text-sm">
                {stat.title}
              </p>

              <h2 className="mt-1 text-2xl font-bold sm:text-3xl">
                {stat.value}
              </h2>

              <p className="mt-1 text-xs text-[#A78BFA]">
                {stat.change}
              </p>
            </div>
          ))}

        </section>

        {/* =====================================================
            CONTINUE + REVIEW
        ====================================================== */}

        <section className="grid gap-5 lg:grid-cols-[1.55fr_1fr]">

          {/* CONTINUE LEARNING */}

          <div
            className="
              rounded-2xl
              border border-[#17133A]
              bg-[#090820]
              p-5 sm:p-6
            "
          >

            <div className="mb-5 flex items-center justify-between">

              <div>
                <h2 className="text-lg font-semibold">
                  Continue Learning
                </h2>

                <p className="mt-1 text-xs text-[#7180A3]">
                  Pick up where you left off
                </p>
              </div>

              <button className="text-xs text-[#B794F6] transition hover:text-[#C4B5FD]">
                View history
              </button>

            </div>

            {/* Video Card */}

            <div className="overflow-hidden rounded-2xl border border-[#17133A] bg-[#070718]">

              <div
                className="
                  relative
                  aspect-video
                  overflow-hidden
                  bg-gradient-to-br
                  from-[#25154D]
                  via-[#130D31]
                  to-[#070718]
                "
              >

                {/* Glow */}

                <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7C3AED]/20 blur-3xl" />

                {/* Play */}

                <button
                  className="
                    absolute
                    left-1/2
                    top-1/2
                    flex
                    h-14
                    w-14
                    -translate-x-1/2
                    -translate-y-1/2
                    items-center
                    justify-center
                    rounded-full
                    bg-gradient-to-br
                    from-[#7C3AED]
                    to-[#9333EA]
                    text-white
                    shadow-[0_8px_30px_rgba(124,58,237,0.4)]
                    transition
                    hover:scale-110
                  "
                >
                  <FontAwesomeIcon
                    icon={faPlay}
                    className="ml-1"
                  />
                </button>

                {/* Time */}

                <span
                  className="
                    absolute
                    bottom-3
                    left-3
                    rounded-md
                    bg-black/70
                    px-2
                    py-1
                    text-xs
                    text-gray-300
                  "
                >
                  42:18
                </span>

                {/* Progress */}

                <div className="absolute bottom-0 left-0 h-1 w-full bg-white/5">
                  <div className="h-full w-[72%] bg-gradient-to-r from-[#7C3AED] to-[#B794F6]" />
                </div>

              </div>

              {/* Video information */}

              <div className="p-4 sm:p-5">

                <div className="mb-2 flex items-center gap-2 text-xs text-[#B794F6]">
                  <span>JavaScript</span>

                  <span className="text-[#38345A]">
                    •
                  </span>

                  <span>Intermediate</span>
                </div>

                <h3 className="font-semibold sm:text-lg">
                  JavaScript Full Course for Beginners
                </h3>

                <p className="mt-1 text-xs text-[#7180A3]">
                  Continue from 42:18
                </p>

                {/* Progress */}

                <div className="mt-5 flex items-center gap-3">

                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/5">
                    <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-[#7C3AED] to-[#A78BFA]" />
                  </div>

                  <span className="text-xs text-[#7180A3]">
                    72%
                  </span>

                </div>

                <button
                  className="
                    mt-5
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-gradient-to-r
                    from-[#7C3AED]
                    to-[#8B5CF6]
                    py-3
                    text-sm
                    font-semibold
                    text-white
                    transition
                    hover:from-[#8B5CF6]
                    hover:to-[#9333EA]
                  "
                >
                  Continue Watching

                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="text-xs"
                  />
                </button>

              </div>

            </div>
          </div>

          {/* REVIEW WORDS */}

          <div
            className="
              rounded-2xl
              border border-[#17133A]
              bg-[#090820]
              p-5 sm:p-6
            "
          >

            <div className="mb-5 flex items-center justify-between">

              <div>
                <h2 className="text-lg font-semibold">
                  Review Words
                </h2>

                <p className="mt-1 text-xs text-[#7180A3]">
                  Words ready for revision
                </p>
              </div>

              <span className="rounded-lg bg-[#7C3AED]/10 px-2.5 py-1 text-xs text-[#B794F6]">
                12 due
              </span>

            </div>

            <div className="space-y-3">

              {reviewWords.map((item) => (
                <button
                  key={item.word}
                  className="
                    group
                    flex
                    w-full
                    items-center
                    justify-between
                    rounded-xl
                    border border-[#17133A]
                    bg-[#070718]
                    p-4
                    text-left
                    transition
                    hover:border-[#332568]
                    hover:bg-[#0D0A2A]
                  "
                >

                  <div className="min-w-0">

                    <h3 className="font-medium">
                      {item.word}
                    </h3>

                    <p className="mt-1 truncate text-xs text-[#7180A3]">
                      {item.meaning}
                    </p>

                  </div>

                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className="
                      ml-3
                      text-xs
                      text-[#4B4868]
                      transition
                      group-hover:text-[#B794F6]
                    "
                  />

                </button>
              ))}

            </div>

            <button
              className="
                mt-5
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                border border-[#241D4B]
                py-3
                text-sm
                text-[#A8A8C0]
                transition
                hover:border-[#453477]
                hover:bg-[#7C3AED]/5
                hover:text-[#B794F6]
              "
            >
              Review All Words

              <FontAwesomeIcon
                icon={faArrowRight}
                className="text-xs"
              />
            </button>

          </div>

        </section>

        {/* =====================================================
            ACTIVITY + RECENT WORDS
        ====================================================== */}

        <section className="mt-5 grid gap-5 lg:grid-cols-[1.25fr_1fr]">

          {/* WEEKLY ACTIVITY */}

          <div
            className="
              rounded-2xl
              border border-[#17133A]
              bg-[#090820]
              p-5 sm:p-6
            "
          >

            <div className="mb-7 flex items-center justify-between">

              <div>
                <div className="flex items-center gap-2">

                  <FontAwesomeIcon
                    icon={faChartLine}
                    className="text-sm text-[#A78BFA]"
                  />

                  <h2 className="font-semibold">
                    Weekly Activity
                  </h2>

                </div>

                <p className="mt-1 text-xs text-[#7180A3]">
                  Words learned this week
                </p>
              </div>

              <span className="text-sm font-medium text-[#B794F6]">
                184 words
              </span>

            </div>


            {/* Chart */}

            <div className="flex h-52 items-end justify-between gap-2 sm:gap-4">

              {weeklyActivity.map((item) => (

                <div
                  key={item.day}
                  className="flex h-full flex-1 flex-col items-center justify-end gap-2"
                >

                  <div className="flex h-full w-full items-end justify-center">

                    <div
                      style={{
                        height: `${item.value}%`,
                      }}
                      className="
                        w-full
                        max-w-10
                        rounded-t-lg
                        bg-gradient-to-t
                        from-[#5B21B6]
                        to-[#A78BFA]
                        opacity-75
                        transition
                        hover:opacity-100
                      "
                    />

                  </div>

                  <span className="text-[10px] text-[#59617D] sm:text-xs">
                    {item.day}
                  </span>

                </div>

              ))}

            </div>

          </div>

          {/* RECENT VOCABULARY */}

          <div
            className="
              rounded-2xl
              border border-[#17133A]
              bg-[#090820]
              p-5 sm:p-6
            "
          >

            <div className="mb-5 flex items-center justify-between">

              <div>
                <h2 className="font-semibold">
                  Recent Vocabulary
                </h2>

                <p className="mt-1 text-xs text-[#7180A3]">
                  Your latest words
                </p>
              </div>

              <button className="text-xs text-[#B794F6] hover:text-[#C4B5FD]">
                See all
              </button>

            </div>

            <div className="space-y-1">

              {recentWords.map((item) => (

                <button
                  key={item.word}
                  className="
                    flex
                    w-full
                    items-center
                    justify-between
                    rounded-xl
                    p-3
                    text-left
                    transition
                    hover:bg-[#7C3AED]/5
                  "
                >

                  <div className="flex min-w-0 items-center gap-3">

                    <div
                      className="
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        bg-[#7C3AED]/10
                      "
                    >
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        className="text-sm text-[#A78BFA]"
                      />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">

                        <h3 className="text-sm font-medium">
                          {item.word}
                        </h3>

                        <span className="hidden text-[10px] text-[#59617D] sm:block">
                          {item.type}
                        </span>

                      </div>

                      <p className="truncate text-xs text-[#7180A3]">
                        {item.meaning}
                      </p>

                    </div>

                  </div>

                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className="ml-2 shrink-0 text-xs text-[#45425F]"
                  />

                </button>

              ))}

            </div>

          </div>

        </section>

      </div>
    </main>
  );
};

export default Dashboard;

