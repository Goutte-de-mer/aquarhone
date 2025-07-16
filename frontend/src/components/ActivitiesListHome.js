"use client";
import { useEffect, useState } from "react";
import Activity from "./Activity";

const ActivitiesListHome = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/activities?limit=3`,
          {
            method: "GET",
            credentials: "include",
          },
        );
        if (response.ok) {
          const data = await response.json();
          setActivities(data);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des activités :", error);
      } finally {
        setLoading(false);
      }
    };
    fetchActivities();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <ul className="grid grid-cols-3 gap-6">
          {activities.map((activity) => (
            <Activity key={activity._id} activity={activity} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default ActivitiesListHome;
