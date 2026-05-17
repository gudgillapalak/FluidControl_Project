import {
  useEffect,
  useState,
} from "react";

import { AppLayout }
from "@/components/AppLayout";

const ActivityLog = () => {

  const [activities,
    setActivities] =
    useState<any[]>([]);

  useEffect(() => {

    fetchActivities();

  }, []);

  const fetchActivities =
    async () => {

      try {

        const token =
          JSON.parse(

            localStorage.getItem(
              "user"
            ) || "{}"
          ).token;

        const res =
          await fetch(

`${import.meta.env.VITE_API_URL}/api/activity`,

            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        const data =
          await res.json();

        setActivities(data);

      }

      catch (error) {

        console.log(error);

      }
    };

  return (

    <AppLayout>

      <div className="space-y-6">

        <div>

          <h1
className="text-3xl font-bold">

            Activity Log

          </h1>

          <p
className="text-muted-foreground">

            Track all changes
            and actions

          </p>

        </div>

        <div
className="rounded-xl border bg-card">

          <table
className="w-full">

            <thead>

              <tr
className="border-b">

                <th
className="text-left p-4">

                  User

                </th>

                <th
className="text-left p-4">

                  Action

                </th>

                <th
className="text-left p-4">

                  Entity

                </th>

                <th
className="text-left p-4">

                  Date

                </th>

              </tr>

            </thead>

            <tbody>

              {activities.length >
              0 ? (

                activities.map(
                  (a, i) => (

                    <tr
key={i}
className="border-b">

                      <td
className="p-4">

                        {a.user}

                      </td>

                      <td
className="p-4">

                        {a.action}

                      </td>

                      <td
className="p-4">

                        {a.entity}

                      </td>

                      <td
className="p-4">

                        {

new Date(
a.createdAt
).toLocaleString()

                        }

                      </td>

                    </tr>
                  )
                )

              ) : (

                <tr>

                  <td
colSpan={4}
className="text-center p-8 text-muted-foreground">

                    No activity
                    recorded yet

                  </td>

                </tr>
              )}

            </tbody>

          </table>

        </div>

      </div>

    </AppLayout>
  );
};

export default ActivityLog;