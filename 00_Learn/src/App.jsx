import { use, useEffect, useState } from "react";
import axios from "axios"

function App() {
  const [data,setData] = useState(null)
  const [repos, setRepos] = useState(null)
  const [username, setUsername] = useState('')

  const api = async () => {
    const res = await axios.get(`https://api.github.com/users/${username}`)
    setData(res.data)
    repo();
    
  }

  const repo = async () => {
    const res = await axios.get(`https://api.github.com/users/${username}/repos`)
    setRepos(res.data);
  }

  

  return (
    <div className="min-h-screen bg-[#0d1117] px-4 py-8 text-white">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                GitHub Client
              </h1>

              <p className="mt-1 text-sm text-gray-400">
                Explore GitHub profiles and contributions
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-700 bg-[#161b22]">
              ◐
            </div>
          </div>
        </header>


        {/* Search */}
        <section className="mb-6 rounded-2xl border border-gray-800 bg-[#161b22] p-5">
          <div className="flex flex-col gap-3 sm:flex-row">

            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter GitHub username..."
              className="h-12 flex-1 rounded-xl border border-gray-700 bg-[#0d1117] px-4 text-sm text-white outline-none placeholder:text-gray-500 focus:border-gray-500"
            />

            <button
              className="h-12 rounded-xl bg-white px-7 text-sm font-semibold text-black transition hover:bg-gray-200" onClick={() => api()}
            >
              Search
            </button>

          </div>
        </section>


        {/* Profile */}
        <section className="mb-6 rounded-2xl border border-gray-800 bg-[#161b22] p-6">

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">

            {/* Avatar */}
            <div className="h-28 w-28 shrink-0 overflow-hidden rounded-full border-4 border-gray-700 bg-gray-800">
              <img
                src={data?.avatar_url}
                alt="GitHub profile"
                className="h-full w-full object-cover"
              />
            </div>


            {/* User information */}
            <div className="flex-1">

              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-2xl font-bold">
                  {data?.name}
                </h2>

                <span className="rounded-full border border-gray-700 px-3 py-1 text-xs text-gray-400">
                  @{data?.login}
                </span>
              </div>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-400">
               {data?.bio}
              </p>

              <div className="mt-4 flex flex-wrap gap-5 text-sm text-gray-400">
                <span>📍 San Francisco</span>
                <span>🔗 github.com/octocat</span>
                <span>🏢 GitHub</span>
              </div>

            </div>

          </div>

        </section>


        {/* Stats */}
        <section className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">

          <div className="rounded-2xl border border-gray-800 bg-[#161b22] p-5">
            <p className="text-sm text-gray-500">
              Public Repositories
            </p>

            <p className="mt-2 text-3xl font-bold">
              {data?.public_repos}
            </p>
          </div>


          <div className="rounded-2xl border border-gray-800 bg-[#161b22] p-5">
            <p className="text-sm text-gray-500">
              Followers
            </p>

            <p className="mt-2 text-3xl font-bold">
              {data?.followers}
            </p>
          </div>


          <div className="rounded-2xl border border-gray-800 bg-[#161b22] p-5">
            <p className="text-sm text-gray-500">
              Following
            </p>

            <p className="mt-2 text-3xl font-bold">
              {data?.following}
            </p>
          </div>


          <div className="rounded-2xl border border-gray-800 bg-[#161b22] p-5">
            <p className="text-sm text-gray-500">
              Public Gists
            </p>

            <p className="mt-2 text-3xl font-bold">
              {data?.public_gists}
            </p>
          </div>

        </section>


        {/* Contribution Graph */}
        <section className="mb-6 rounded-2xl border border-gray-800 bg-[#161b22] p-6">

          <div className="mb-5">
            <h2 className="text-lg font-semibold">
              Contributions
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              1,247 contributions in the last year
            </p>
          </div>


          {/* Graph */}
          <div className="overflow-x-auto pb-3">

            <div className="flex min-w-850px gap-1">

              {/* Column 1 */}
              <div className="flex flex-col gap-1">
                <span className="h-3 w-3 rounded-sm bg-[#161b22]" />
                <span className="h-3 w-3 rounded-sm bg-[#0e4429]" />
                <span className="h-3 w-3 rounded-sm bg-[#006d32]" />
                <span className="h-3 w-3 rounded-sm bg-[#26a641]" />
                <span className="h-3 w-3 rounded-sm bg-[#161b22]" />
                <span className="h-3 w-3 rounded-sm bg-[#0e4429]" />
                <span className="h-3 w-3 rounded-sm bg-[#26a641]" />
              </div>


              {/* Column 2 */}
              <div className="flex flex-col gap-1">
                <span className="h-3 w-3 rounded-sm bg-[#0e4429]" />
                <span className="h-3 w-3 rounded-sm bg-[#26a641]" />
                <span className="h-3 w-3 rounded-sm bg-[#161b22]" />
                <span className="h-3 w-3 rounded-sm bg-[#006d32]" />
                <span className="h-3 w-3 rounded-sm bg-[#26a641]" />
                <span className="h-3 w-3 rounded-sm bg-[#0e4429]" />
                <span className="h-3 w-3 rounded-sm bg-[#161b22]" />
              </div>


              {/* Column 3 */}
              <div className="flex flex-col gap-1">
                <span className="h-3 w-3 rounded-sm bg-[#006d32]" />
                <span className="h-3 w-3 rounded-sm bg-[#161b22]" />
                <span className="h-3 w-3 rounded-sm bg-[#26a641]" />
                <span className="h-3 w-3 rounded-sm bg-[#0e4429]" />
                <span className="h-3 w-3 rounded-sm bg-[#006d32]" />
                <span className="h-3 w-3 rounded-sm bg-[#161b22]" />
                <span className="h-3 w-3 rounded-sm bg-[#26a641]" />
              </div>


              {/* Repeated visual columns */}
              <div className="flex flex-col gap-1">
                <span className="h-3 w-3 rounded-sm bg-[#26a641]" />
                <span className="h-3 w-3 rounded-sm bg-[#0e4429]" />
                <span className="h-3 w-3 rounded-sm bg-[#161b22]" />
                <span className="h-3 w-3 rounded-sm bg-[#006d32]" />
                <span className="h-3 w-3 rounded-sm bg-[#26a641]" />
                <span className="h-3 w-3 rounded-sm bg-[#0e4429]" />
                <span className="h-3 w-3 rounded-sm bg-[#006d32]" />
              </div>


              <div className="flex flex-col gap-1">
                <span className="h-3 w-3 rounded-sm bg-[#161b22]" />
                <span className="h-3 w-3 rounded-sm bg-[#006d32]" />
                <span className="h-3 w-3 rounded-sm bg-[#26a641]" />
                <span className="h-3 w-3 rounded-sm bg-[#0e4429]" />
                <span className="h-3 w-3 rounded-sm bg-[#006d32]" />
                <span className="h-3 w-3 rounded-sm bg-[#26a641]" />
                <span className="h-3 w-3 rounded-sm bg-[#161b22]" />
              </div>


              <div className="flex flex-col gap-1">
                <span className="h-3 w-3 rounded-sm bg-[#0e4429]" />
                <span className="h-3 w-3 rounded-sm bg-[#161b22]" />
                <span className="h-3 w-3 rounded-sm bg-[#006d32]" />
                <span className="h-3 w-3 rounded-sm bg-[#26a641]" />
                <span className="h-3 w-3 rounded-sm bg-[#0e4429]" />
                <span className="h-3 w-3 rounded-sm bg-[#161b22]" />
                <span className="h-3 w-3 rounded-sm bg-[#26a641]" />
              </div>


              <div className="flex flex-col gap-1">
                <span className="h-3 w-3 rounded-sm bg-[#006d32]" />
                <span className="h-3 w-3 rounded-sm bg-[#26a641]" />
                <span className="h-3 w-3 rounded-sm bg-[#0e4429]" />
                <span className="h-3 w-3 rounded-sm bg-[#161b22]" />
                <span className="h-3 w-3 rounded-sm bg-[#26a641]" />
                <span className="h-3 w-3 rounded-sm bg-[#006d32]" />
                <span className="h-3 w-3 rounded-sm bg-[#0e4429]" />
              </div>

            </div>

          </div>


          {/* Legend */}
          <div className="mt-4 flex items-center justify-end gap-2 text-xs text-gray-500">

            <span>Less</span>

            <span className="h-3 w-3 rounded-sm bg-[#161b22]" />
            <span className="h-3 w-3 rounded-sm bg-[#0e4429]" />
            <span className="h-3 w-3 rounded-sm bg-[#006d32]" />
            <span className="h-3 w-3 rounded-sm bg-[#26a641]" />

            <span>More</span>

          </div>

        </section>


        {/* Repositories */}
        <section>

          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">
                Repositories
              </h2>

              <p className="text-sm text-gray-500">
                Public repositories from this user
              </p>
            </div>

            <span className="text-sm text-gray-500">
              42 repositories
            </span>
          </div>


          <div className="grid gap-4 md:grid-cols-2">


            {/* Repository Card */}
            <div className="rounded-2xl border border-gray-800 bg-[#161b22] p-5 transition hover:border-gray-600">

              <div className="flex items-start justify-between gap-4">

                <div>
                  <h3 className="font-semibold cursor-pointer text-blue-400">
                    {data?.repos}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    A sample GitHub project used for learning React.
                  </p>
                </div>

                <span className="rounded-full border border-gray-700 px-2 py-1 text-xs text-gray-500">
                  Public
                </span>

              </div>

              <div className="mt-5 flex gap-5 text-xs text-gray-500">
                <span>● JavaScript</span>
                <span>⭐ 120</span>
                <span>🍴 24</span>
              </div>

            </div>


            {/* Repository Card */}
            <div className="rounded-2xl border border-gray-800 bg-[#161b22] p-5 transition hover:border-gray-600">

              <div className="flex items-start justify-between gap-4">

                <div>
                  <h3 className="font-semibold text-blue-400">
                    react-learning
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    React experiments, components and practice projects.
                  </p>
                </div>

                <span className="rounded-full border border-gray-700 px-2 py-1 text-xs text-gray-500">
                  Public
                </span>

              </div>

              <div className="mt-5 flex gap-5 text-xs text-gray-500">
                <span>● TypeScript</span>
                <span>⭐ 82</span>
                <span>🍴 12</span>
              </div>

            </div>


            {/* Repository Card */}
            <div className="rounded-2xl border border-gray-800 bg-[#161b22] p-5 transition hover:border-gray-600">

              <div className="flex items-start justify-between gap-4">

                <div>
                  <h3 className="font-semibold text-blue-400">
                    api-project
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    REST API practice project with different endpoints.
                  </p>
                </div>

                <span className="rounded-full border border-gray-700 px-2 py-1 text-xs text-gray-500">
                  Public
                </span>

              </div>

              <div className="mt-5 flex gap-5 text-xs text-gray-500">
                <span>● JavaScript</span>
                <span>⭐ 45</span>
                <span>🍴 8</span>
              </div>

            </div>


            {/* Repository Card */}
            <div className="rounded-2xl border border-gray-800 bg-[#161b22] p-5 transition hover:border-gray-600">

              <div className="flex items-start justify-between gap-4">

                <div>
                  <h3 className="font-semibold text-blue-400">
                    portfolio
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    Personal portfolio website and frontend experiments.
                  </p>
                </div>

                <span className="rounded-full border border-gray-700 px-2 py-1 text-xs text-gray-500">
                  Public
                </span>

              </div>

              <div className="mt-5 flex gap-5 text-xs text-gray-500">
                <span>● CSS</span>
                <span>⭐ 31</span>
                <span>🍴 4</span>
              </div>

            </div>

          </div>

        </section>

      </div>
    </div>
  );
}

export default App;