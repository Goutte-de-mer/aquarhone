import { useState } from "react";
import { MapPin, CirclePlus, Clock, Ticket, X } from "lucide-react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useAuth } from "@/app/context/UserContext";
import { registerToActivity } from "@/app/actions";

const Activity = ({ activity }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const { user } = useAuth();

  console.log(user);

  const handleRegister = async () => {
    const result = await registerToActivity(activity._id);
    if (result.success) {
      setIsRegistered(true);
      setTimeout(() => {
        setIsRegistered(false);
      }, 3000);
      activity.remainingSeats--;
      user.activities.push(activity._id);
    } else {
      console.log(result.error);
    }
  };

  return (
    <>
      <li className="group relative rounded-xl bg-white px-8 py-5">
        <h3 className="text-lg">{activity.name}</h3>
        <p className="my-5">{activity.description}</p>
        <div className="flex items-center justify-between">
          <p>{activity.price}€</p>
          <p className="flex items-center gap-2.5 text-sm text-gray-500">
            <MapPin strokeWidth={1.5} size={20} />
            {activity.location}
          </p>
        </div>
        {/* Overlay */}
        <div
          className="bg-opacity-50 absolute inset-0 flex cursor-pointer items-center justify-center rounded-xl bg-black/50 opacity-0 transition-opacity duration-400 group-hover:opacity-100"
          onClick={() => setIsModalOpen(true)}
        >
          <div className="scale-90 transform cursor-pointer rounded-full bg-white p-3 transition-transform duration-300 group-hover:scale-100">
            <CirclePlus strokeWidth={1.5} />
          </div>
        </div>
      </li>
      <Dialog
        open={isModalOpen}
        onClose={setIsModalOpen}
        transition
        className={
          "fixed inset-0 z-50 flex w-screen items-center justify-center bg-black/50 p-4 transition duration-300 ease-out data-closed:opacity-0"
        }
      >
        <DialogPanel className="relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-lg bg-white px-6 py-5">
          <button
            className="absolute top-4 right-4 cursor-pointer"
            onClick={() => setIsModalOpen(false)}
          >
            <X strokeWidth={1.5} size={20} />
          </button>
          <DialogTitle className={"mb-4 text-xl font-medium"}>
            {activity.name}
          </DialogTitle>
          <div className="space-y-5">
            <p className="">{activity.description}</p>
            <div className="flex items-center justify-between">
              <p className="flex items-center gap-2.5">
                <Clock strokeWidth={1.5} size={20} /> {activity.duration}min
              </p>
              <p className="flex items-center gap-2.5">
                <Ticket strokeWidth={1.5} size={20} /> {activity.remainingSeats}{" "}
                places restantes
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p>{activity.price}€</p>

              <p className="flex items-center gap-2.5 text-sm text-gray-500">
                <MapPin strokeWidth={1.5} size={20} />
                {activity.location}
              </p>
            </div>
            <div className="border-t-2 border-gray-200 pt-4">
              {activity.remainingSeats <= 0 ? (
                <p className="text-center font-medium text-red-500">
                  Activité complète
                </p>
              ) : user ? (
                user.activities.includes(activity._id) ? (
                  <p className="text-center font-medium text-green-500">
                    Vous êtes inscrit à cette activité
                  </p>
                ) : (
                  <button
                    className="bg-c-teal hover:bg-c-darkteal w-full cursor-pointer rounded-md px-8 py-2.5 font-medium text-white transition"
                    onClick={handleRegister}
                  >
                    Réserver
                  </button>
                )
              ) : (
                <p className="text-c-teal text-center font-medium">
                  Connectez-vous pour réserver
                </p>
              )}
              {isRegistered && (
                <p className="mt-2 text-center text-green-500">
                  Inscription réussie !
                </p>
              )}
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </>
  );
};

export default Activity;
