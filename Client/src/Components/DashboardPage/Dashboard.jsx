const API_URL = import.meta.env.VITE_API_URL;
import { useNavigate } from "react-router";
import { useVideo } from "../../Context/VideoContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import {
  faBookOpen,
  faPlay,
  faFire,
  faClock,
  faArrowRight,
  faCheckCircle,
  faPlus,
  faChevronRight,
  faChartLine,
  faRefresh,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import {
  XAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";

const card = "rounded-2xl border border-[#17133A] bg-[#090820] p-5 sm:p-6";
const primaryBtn =
  "flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] text-sm font-semibold text-white transition hover:from-[#8B5CF6] hover:to-[#9333EA]";

const formatDuration = (s = 0) => {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = Math.floor(s % 60);
  return h
    ? `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`
    : `${m}:${String(sec).padStart(2, "0")}`;
};

const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 5) return "Good night";
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
};

// krushna.waghmare23@gmail.com -> Krushna
const nameFromEmail = (email = "") => {
  const local = email.split("@")[0];
  const first = local.split(/[._\-+]/)[0];
  const clean = first.replace(/\d+/g, "");
  return clean
    ? clean.charAt(0).toUpperCase() + clean.slice(1).toLowerCase()
    : "";
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { setObject } = useVideo();

  const [videoWatched, setVideoWatched] = useState(0);
  const [wordLerned, setWordLearned] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [overview, setOverview] = useState({
    email: "",
    recentWords: [],
    reviewWords: [],
    weeklyActivity: [],
    weeklyTotal: 0,
    streak: 0,
    totalWordsAvailable: 0,
    latestVideo: null,
  });

  // re-render every minute so the greeting stays correct if the tab stays open
  const [, tick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => tick((n) => n + 1), 60_000);
    return () => clearInterval(id);
  }, []);

  const greeting = getGreeting();
  const firstName = nameFromEmail(overview.email) || "there";

  useEffect(() => {
    const load = async () => {
      const [statsRes, ovRes] = await Promise.allSettled([
        axios.get(`${API_URL}/api/v1/dashboard/data`, { withCredentials: true }),
        axios.get(`${API_URL}/api/v1/dashboard/overview`, { withCredentials: true }),
      ]);

      if (statsRes.status === "fulfilled") {
        const d = statsRes.value.data?.data;
        setVideoWatched(d?.watched ?? 0);
        setWordLearned((d?.words ?? []).flatMap((e) => e.answers ?? []).length);
      } else {
        console.error("stats failed:", statsRes.reason?.message);
      }

      if (ovRes.status === "fulfilled") {
        setOverview((prev) => ({ ...prev, ...ovRes.value.data.data }));
      } else {
        console.error("overview failed:", ovRes.reason?.message);
      }
    };
    load();
  }, [refresh]);

  const handleRefresh = () => setRefresh((p) => !p);
  const navigateToLearn = () => navigate("/fetch-video");

  const continueWatching = () => {
    const v = overview.latestVideo;
    if (!v) return navigateToLearn();
    setObject({ url: v.url, title: v.title });
    navigate("/video-player"); // route where VideoPlyer is rendered
  };

  const stats = [
    { title: "Words Learned", value: wordLerned, change: "Answered in quizzes", icon: faBookOpen },
    { title: "Videos Watched", value: videoWatched, change: "Total videos", icon: faPlay },
    {
      title: "Day Streak",
      value: overview.streak,
      change: overview.streak ? "Keep it going!" : "Add a video today",
      icon: faFire,
    },
    { title: "Words Available", value: overview.totalWordsAvailable, change: "From your videos", icon: faClock },
  ];

  const reviewWords = overview.reviewWords.map((w) => ({ word: w.vocabulary, meaning: w.meaning }));
  const recentWords = overview.recentWords.map((w) => ({ word: w.vocabulary, type: w.type, meaning: w.meaning }));
  const weeklyActivity = overview.weeklyActivity;
  const max = Math.max(1, ...weeklyActivity.map((d) => d.value));
  const latest = overview.latestVideo;

  return (
    <main className="min-h-screen bg-[#05051A] text-[#F8F7FF]">
      <div className="mx-auto max-w-[1500px] px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
        {/* WELCOME */}
        <section className="mb-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#B794F6] shadow-[0_0_12px_rgba(167,139,250,0.8)]" />
                <p className="text-sm font-medium text-[#B794F6]">Keep learning</p>
              </div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-[42px]">
                {greeting}, {firstName}
              </h1>
              <p className="mt-2 text-sm text-[#8490B0] sm:text-base">
                Continue building your vocabulary, one word at a time.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleRefresh}
                title="Refresh dashboard"
                className="group flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border border-[#241D4B] bg-[#090820] text-[#A78BFA] transition hover:border-[#453477] hover:bg-[#7C3AED]/10 hover:text-[#C4B5FD]"
              >
                <FontAwesomeIcon
                  icon={faRefresh}
                  className="transition-transform group-hover:rotate-90"
                />
              </button>

              <button
                onClick={navigateToLearn}
                title="Add New Video"
                className={`${primaryBtn} w-fit cursor-pointer px-5 py-3 shadow-[0_8px_30px_rgba(124,58,237,0.25)] hover:scale-[1.02]`}
              >
                <FontAwesomeIcon icon={faPlus} />
                Add New Video
              </button>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="rounded-2xl border border-[#17133A] bg-[#090820] p-5 transition duration-300 hover:border-[#2A2059] hover:bg-[#0B0925]"
            >
              <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-xl bg-[#7C3AED]/10">
                <FontAwesomeIcon icon={stat.icon} className="text-[#A78BFA]" />
              </div>
              <p className="text-xs text-[#7180A3] sm:text-sm">{stat.title}</p>
              <h2 className="mt-1 text-2xl font-bold sm:text-3xl">{stat.value}</h2>
              <p className="mt-1 text-xs text-[#A78BFA]">{stat.change}</p>
            </div>
          ))}
        </section>

        {/* CONTINUE + REVIEW */}
        <section className="grid gap-5 lg:grid-cols-[1.55fr_1fr]">
          <div className={card}>
            <div className="mb-5">
              <h2 className="text-lg font-semibold">Continue Learning</h2>
              <p className="mt-1 text-xs text-[#7180A3]">Your latest video</p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-[#17133A] bg-[#070718]">
              <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-[#25154D] via-[#130D31] to-[#070718]">
                {latest?.thumbnail ? (
                  <img
                    src={latest.thumbnail}
                    alt={latest.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7C3AED]/20 blur-3xl" />
                )}
                {latest?.duration > 0 && (
                  <span className="absolute bottom-3 left-3 rounded-md bg-black/70 px-2 py-1 text-xs text-gray-300">
                    {formatDuration(latest.duration)}
                  </span>
                )}
              </div>

              <div className="p-4 sm:p-5">
                <h3 className="font-semibold sm:text-lg">
                  {latest?.title || "No videos yet"}
                </h3>
                <p className="mt-1 text-xs text-[#7180A3]">
                  {latest ? "Pick up with this video" : "Add a video to get started"}
                </p>

                <button
                  onClick={continueWatching}
                  className={`${primaryBtn} mt-5 w-full cursor-pointer py-3`}
                >
                  {latest ? "Continue Watching" : "Add a Video"}
                  <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
                </button>
              </div>
            </div>
          </div>

          <div className={card}>
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Review Words</h2>
                <p className="mt-1 text-xs text-[#7180A3]">Random words from your videos</p>
              </div>
              <span className="rounded-lg bg-[#7C3AED]/10 px-2.5 py-1 text-xs text-[#B794F6]">
                {reviewWords.length} words
              </span>
            </div>

            <div className="space-y-3">
              {reviewWords.length === 0 && (
                <p className="text-sm text-[#7180A3]">No words yet.</p>
              )}
              {reviewWords.map((item) => (
                <div
                  key={item.word}
                  className="group flex w-full items-center justify-between rounded-xl border border-[#17133A] bg-[#070718] p-4 text-left transition hover:border-[#332568] hover:bg-[#0D0A2A]"
                >
                  <div className="min-w-0">
                    <h3 className="font-medium">{item.word}</h3>
                    <p className="mt-1 truncate text-xs text-[#7180A3]">{item.meaning}</p>
                  </div>
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className="ml-3 text-xs text-[#4B4868] transition group-hover:text-[#B794F6]"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ACTIVITY + RECENT WORDS */}
        <section className="mt-5 grid gap-5 lg:grid-cols-[1.25fr_1fr]">
          <div className={card}>
            <div className="mb-7 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faChartLine} className="text-sm text-[#A78BFA]" />
                  <h2 className="font-semibold">Weekly Activity</h2>
                </div>
                <p className="mt-1 text-xs text-[#7180A3]">Words added this week</p>
              </div>
              <span className="text-sm font-medium text-[#B794F6]">
                {overview.weeklyTotal} words
              </span>
            </div>

            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyActivity} barCategoryGap="30%">
                  <defs>
                    <linearGradient id="barNormal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8b6fc9" />
                      <stop offset="100%" stopColor="#4c1d95" />
                    </linearGradient>
                    <linearGradient id="barActive" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#a78bfa" />
                      <stop offset="100%" stopColor="#6d28d9" />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#475a7a", fontSize: 16 }}
                  />
                  <Tooltip
                    cursor={{ fill: "transparent" }}
                    contentStyle={{
                      background: "#0f0b24",
                      border: "1px solid #2a2150",
                      borderRadius: 8,
                    }}
                    labelStyle={{ color: "#fff" }}
                    itemStyle={{ color: "#B794F6" }}
                  />
                  <Bar dataKey="value" radius={[12, 12, 0, 0]}>
                    {weeklyActivity.map((d) => (
                      <Cell
                        key={d.day}
                        fill={d.value === max ? "url(#barActive)" : "url(#barNormal)"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className={card}>
            <div className="mb-5">
              <h2 className="font-semibold">Recent Vocabulary</h2>
              <p className="mt-1 text-xs text-[#7180A3]">Your latest words</p>
            </div>

            <div className="space-y-1">
              {recentWords.length === 0 && (
                <p className="text-sm text-[#7180A3]">No words yet.</p>
              )}
              {recentWords.map((item) => (
                <div
                  key={item.word}
                  className="flex w-full items-center justify-between rounded-xl p-3 text-left transition hover:bg-[#7C3AED]/5"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#7C3AED]/10">
                      <FontAwesomeIcon icon={faCheckCircle} className="text-sm text-[#A78BFA]" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-medium">{item.word}</h3>
                        <span className="hidden text-[10px] text-[#59617D] sm:block">
                          {item.type}
                        </span>
                      </div>
                      <p className="truncate text-xs text-[#7180A3]">{item.meaning}</p>
                    </div>
                  </div>
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className="ml-2 shrink-0 text-xs text-[#45425F]"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Dashboard;