import { useState } from "react";
import axios from "axios";

function App() {
  const [username, setUsername] = useState("");
  const [data, setData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchUser = async () => {
    const name = username.trim();

    if (!name) {
      setError("Please enter a GitHub username");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const [userRes, repoRes] = await Promise.all([
        axios.get(`https://api.github.com/users/${name}`),
        axios.get(
          `https://api.github.com/users/${name}/repos?per_page=100&sort=updated`
        ),
      ]);

      setData(userRes.data);
      setRepos(repoRes.data);
    } catch (err) {
      setData(null);
      setRepos([]);

      if (err.response?.status === 404) {
        setError("GitHub user not found");
      } else {
        setError("Unable to fetch GitHub data");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      searchUser();
    }
  };

  const formatNumber = (number) => {
    if (!number) return "0";

    if (number >= 1000000) {
      return `${(number / 1000000).toFixed(1)}M`;
    }

    if (number >= 1000) {
      return `${(number / 1000).toFixed(1)}K`;
    }

    return number;
  };

  const formatDate = (date) => {
    if (!date) return "Unknown";

    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const languageColors = {
    JavaScript: "bg-yellow-400",
    TypeScript: "bg-blue-500",
    Python: "bg-blue-400",
    Java: "bg-orange-500",
    C: "bg-gray-400",
    "C++": "bg-pink-500",
    HTML: "bg-orange-600",
    CSS: "bg-blue-600",
    PHP: "bg-purple-500",
    Go: "bg-cyan-400",
    Rust: "bg-orange-400",
    Dart: "bg-cyan-500",
    Kotlin: "bg-purple-400",
    Swift: "bg-orange-400",
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#070a0f] text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[-200px] top-[-200px] h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[140px]" />
        <div className="absolute right-[-200px] top-[300px] h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[140px]" />
        <div className="absolute bottom-[-250px] left-[30%] h-[500px] w-[500px] rounded-full bg-cyan-500/5 blur-[140px]" />
      </div>

      <div className="relative mx-auto min-h-screen max-w-[1500px] px-4 py-5 sm:px-6 lg:px-8">
        <header className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] shadow-lg shadow-purple-500/10">
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6 fill-white"
              >
                <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.24c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49.99.11-.77.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.25 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.6-2.8 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.58A12 12 0 0 0 12 .5Z" />
              </svg>
            </div>

            <div>
              <h1 className="text-lg font-bold tracking-tight sm:text-xl">
                GitHub Explorer
              </h1>
              <p className="hidden text-xs text-gray-500 sm:block">
                Explore profiles & repositories
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-gray-400">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            GitHub API
          </div>
        </header>

        {!data && !loading && (
          <section className="flex min-h-[70vh] items-center justify-center">
            <div className="w-full max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-gray-400 backdrop-blur-xl">
                <span className="h-2 w-2 rounded-full bg-purple-400" />
                Developer Profile Explorer
              </div>

              <h2 className="text-4xl font-black tracking-tight sm:text-6xl lg:text-7xl">
                Explore
                <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  {" "}GitHub
                </span>
              </h2>

              <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">
                Search any GitHub username and discover their profile,
                repositories, statistics and developer activity.
              </p>

              <div className="mx-auto mt-8 flex max-w-2xl flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-2 shadow-2xl shadow-black/40 backdrop-blur-xl sm:flex-row">
                <div className="flex flex-1 items-center gap-3 px-3">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5 shrink-0 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="11" cy="11" r="7" />
                    <path d="m20 20-4-4" />
                  </svg>

                  <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyDown={handleKeyDown}
                    type="text"
                    placeholder="Search GitHub username..."
                    className="h-12 w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-600"
                  />
                </div>

                <button
                  onClick={searchUser}
                  className="h-12 rounded-xl bg-white px-7 text-sm font-bold text-black transition duration-300 hover:bg-gray-200 active:scale-95"
                >
                  Search
                </button>
              </div>

              {error && (
                <p className="mt-4 text-sm text-red-400">
                  {error}
                </p>
              )}
            </div>
          </section>
        )}

        {loading && (
          <section className="flex min-h-[70vh] items-center justify-center">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-white/10 border-t-purple-400" />
              <p className="mt-5 text-sm text-gray-500">
                Fetching GitHub profile...
              </p>
            </div>
          </section>
        )}

        {data && !loading && (
          <main>
            <section className="mb-6 rounded-3xl border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-7">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                  <div className="relative mx-auto sm:mx-0">
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 opacity-60 blur-md" />

                    <img
                      src={data.avatar_url}
                      alt={data.login}
                      className="relative h-28 w-28 rounded-full border-4 border-[#10141c] object-cover sm:h-32 sm:w-32"
                    />

                    <span className="absolute bottom-2 right-2 h-5 w-5 rounded-full border-4 border-[#10141c] bg-emerald-400" />
                  </div>

                  <div className="text-center sm:text-left">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                      <h2 className="text-2xl font-black sm:text-3xl">
                        {data.name || data.login}
                      </h2>

                      <span className="mx-auto w-fit rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-gray-400 sm:mx-0">
                        @{data.login}
                      </span>
                    </div>

                    {data.bio && (
                      <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-400">
                        {data.bio}
                      </p>
                    )}

                    <div className="mt-4 flex flex-wrap justify-center gap-3 text-xs text-gray-500 sm:justify-start">
                      {data.location && (
                        <span className="rounded-lg border border-white/5 bg-white/[0.03] px-3 py-2">
                          📍 {data.location}
                        </span>
                      )}

                      {data.company && (
                        <span className="rounded-lg border border-white/5 bg-white/[0.03] px-3 py-2">
                          🏢 {data.company}
                        </span>
                      )}

                      {data.blog && (
                        <a
                          href={
                            data.blog.startsWith("http")
                              ? data.blog
                              : `https://${data.blog}`
                          }
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-lg border border-white/5 bg-white/[0.03] px-3 py-2 transition hover:bg-white/[0.08] hover:text-white"
                        >
                          🔗 Website
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row">
                  <button
                    onClick={() => {
                      setData(null);
                      setRepos([]);
                      setUsername("");
                      setError("");
                    }}
                    className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-medium text-gray-300 transition hover:bg-white/[0.08] hover:text-white"
                  >
                    New Search
                  </button>

                  <a
                    href={data.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl bg-white px-5 py-3 text-center text-sm font-bold text-black transition hover:bg-gray-200"
                  >
                    View Profile
                  </a>
                </div>
              </div>
            </section>

            <section className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {[
                {
                  label: "Repositories",
                  value: data.public_repos,
                  icon: "📦",
                },
                {
                  label: "Followers",
                  value: data.followers,
                  icon: "👥",
                },
                {
                  label: "Following",
                  value: data.following,
                  icon: "➜",
                },
                {
                  label: "Gists",
                  value: data.public_gists,
                  icon: "📝",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="group rounded-2xl border border-white/10 bg-white/[0.035] p-4 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06] sm:p-5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xl">{stat.icon}</span>
                    <span className="text-xs text-gray-600">
                      GitHub
                    </span>
                  </div>

                  <p className="mt-4 text-2xl font-black sm:text-3xl">
                    {formatNumber(stat.value)}
                  </p>

                  <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                    {stat.label}
                  </p>
                </div>
              ))}
            </section>

            <section className="mb-6 rounded-3xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl sm:p-7">
              <div className="mb-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                <div>
                  <h2 className="text-xl font-bold">
                    Repository Overview
                  </h2>

                  <p className="mt-1 text-xs text-gray-500">
                    Public repositories from @{data.login}
                  </p>
                </div>

                <span className="w-fit rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-gray-400">
                  {repos.length} repositories
                </span>
              </div>

              {repos.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-white/10 py-14 text-center">
                  <div className="text-4xl">📦</div>
                  <p className="mt-3 text-sm text-gray-500">
                    No public repositories found.
                  </p>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {repos.map((repo) => (
                    <a
                      key={repo.id}
                      href={repo.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex min-h-[230px] flex-col rounded-2xl border border-white/10 bg-[#0d1117]/80 p-5 transition duration-300 hover:-translate-y-1 hover:border-purple-500/40 hover:bg-white/[0.04] hover:shadow-xl hover:shadow-purple-500/5"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h3 className="truncate text-base font-bold text-blue-400 transition group-hover:text-purple-400">
                            {repo.name}
                          </h3>

                          <span className="mt-2 inline-block rounded-full border border-white/10 px-2.5 py-1 text-[10px] text-gray-500">
                            {repo.private ? "Private" : "Public"}
                          </span>
                        </div>

                        <svg
                          viewBox="0 0 24 24"
                          className="h-5 w-5 shrink-0 text-gray-600 transition group-hover:text-white"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M7 17 17 7" />
                          <path d="M7 7h10v10" />
                        </svg>
                      </div>

                      <p className="mt-4 line-clamp-3 text-sm leading-6 text-gray-500">
                        {repo.description || "No description available."}
                      </p>

                      <div className="mt-auto pt-6">
                        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                          {repo.language && (
                            <span className="flex items-center gap-2">
                              <span
                                className={`h-2.5 w-2.5 rounded-full ${
                                  languageColors[repo.language] ||
                                  "bg-gray-500"
                                }`}
                              />
                              {repo.language}
                            </span>
                          )}

                          <span>⭐ {formatNumber(repo.stargazers_count)}</span>

                          <span>🍴 {formatNumber(repo.forks_count)}</span>
                        </div>

                        <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-4 text-[11px] text-gray-600">
                          <span>
                            Updated {formatDate(repo.updated_at)}
                          </span>

                          <span className="transition group-hover:text-purple-400">
                            Open →
                          </span>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </section>

            <section className="mb-6 grid gap-6 lg:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl">
                <h2 className="text-lg font-bold">
                  Developer Information
                </h2>

                <div className="mt-5 space-y-3">
                  <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.025] p-4">
                    <span className="text-sm text-gray-500">
                      Account Type
                    </span>
                    <span className="text-sm font-medium text-gray-300">
                      {data.type}
                    </span>
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.025] p-4">
                    <span className="text-sm text-gray-500">
                      Public Repositories
                    </span>
                    <span className="text-sm font-medium text-gray-300">
                      {data.public_repos}
                    </span>
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.025] p-4">
                    <span className="text-sm text-gray-500">
                      Public Gists
                    </span>
                    <span className="text-sm font-medium text-gray-300">
                      {data.public_gists}
                    </span>
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.025] p-4">
                    <span className="text-sm text-gray-500">
                      Profile Created
                    </span>
                    <span className="text-sm font-medium text-gray-300">
                      {formatDate(data.created_at)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold">
                      Repository Languages
                    </h2>

                    <p className="mt-1 text-xs text-gray-500">
                      Languages used across public repositories
                    </p>
                  </div>

                  <span className="text-2xl">💻</span>
                </div>

                <div className="mt-6 space-y-4">
                  {Object.entries(
                    repos.reduce((acc, repo) => {
                      if (repo.language) {
                        acc[repo.language] =
                          (acc[repo.language] || 0) + 1;
                      }

                      return acc;
                    }, {})
                  )
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 6)
                    .map(([language, count]) => {
                      const percentage = Math.round(
                        (count / repos.filter((r) => r.language).length) *
                          100
                      );

                      return (
                        <div key={language}>
                          <div className="mb-2 flex items-center justify-between text-xs">
                            <span className="flex items-center gap-2 text-gray-300">
                              <span
                                className={`h-2.5 w-2.5 rounded-full ${
                                  languageColors[language] ||
                                  "bg-gray-500"
                                }`}
                              />
                              {language}
                            </span>

                            <span className="text-gray-600">
                              {count} repos
                            </span>
                          </div>

                          <div className="h-2 overflow-hidden rounded-full bg-white/5">
                            <div
                              className={`h-full rounded-full ${
                                languageColors[language] ||
                                "bg-gray-500"
                              }`}
                              style={{
                                width: `${percentage}%`,
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}

                  {repos.filter((repo) => repo.language).length === 0 && (
                    <div className="py-10 text-center text-sm text-gray-600">
                      Language data unavailable.
                    </div>
                  )}
                </div>
              </div>
            </section>

            <footer className="border-t border-white/5 py-8 text-center text-xs text-gray-600">
              Built with React, Tailwind CSS, Axios & GitHub API
            </footer>
          </main>
        )}
      </div>
    </div>
  );
}

export default App;