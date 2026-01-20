import { useState, useEffect } from "react";
import axios from "axios";

function UserList() {
  const [listOfUSer, setListOfUSer] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setListOfUSer(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-pulse">
            <div className="w-16 h-16 bg-slate-200 rounded-full mb-4"></div>
          </div>
          <p className="text-slate-600 text-lg font-medium">
            Loading directory...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center bg-white p-8 rounded-lg border border-slate-200 shadow-sm">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-xl">⚠</span>
          </div>
          <h2 className="text-xl font-semibold text-slate-800 mb-2">
            Unable to Load Directory
          </h2>
          <p className="text-slate-600 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto py-12 px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-serif font-bold text-slate-800 mb-3">
            Professional Directory
          </h1>
          <p className="text-slate-600 text-base max-w-2xl mx-auto leading-relaxed">
            A comprehensive listing of our valued professionals and their
            contact information
          </p>
          <div className="w-16 h-0.5 bg-slate-400 mx-auto mt-6"></div>
        </div>

        {/* User List */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 bg-slate-100 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800">
              Team Members
            </h2>
            <p className="text-sm text-slate-600">
              Total: {listOfUSer.length} professionals
            </p>
          </div>

          <div className="divide-y divide-slate-100">
            {listOfUSer.map((user, index) => (
              <div
                key={user.id}
                className={`p-6 transition-colors duration-150 ${
                  index % 2 === 0 ? "bg-white" : "bg-slate-50/50"
                } hover:bg-slate-50`}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  {/* User Info */}
                  <div className="flex-1 mb-4 md:mb-0">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-slate-700 font-semibold text-lg">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg font-semibold text-slate-800 mb-1">
                          {user.name}
                        </h3>
                        <p className="text-sm text-slate-500 mb-2">
                          @{user.username}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center text-slate-600">
                            <span className="w-4 h-4 mr-2 text-slate-400">
                              ✉
                            </span>
                            <span className="truncate">{user.email}</span>
                          </div>
                          <div className="flex items-center text-slate-600">
                            <span className="w-4 h-4 mr-2 text-slate-400">
                              📞
                            </span>
                            <span className="truncate">{user.phone}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Website Link */}
                  <div className="md:text-right">
                    <a
                      href={`https://${user.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors duration-150 border border-slate-300"
                    >
                      <span className="w-4 h-4 mr-2">🌐</span>
                      {user.website}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-slate-500">
          <p>Directory last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}

export default UserList;
