import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTraveleroptions,
} from "@/constants/options";
import { chatSession } from "@/service/AIModal";
import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { toast } from "sonner";

function CreateTrip() {
  const [place, setPlace] = useState();

  const [formData, setFormData] = useState([]);

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name] :value
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const OnGenerateTrip = async () => {
    if (formData?.noOfdays > 5&&!formData?.location||!formData?.budget||!formData?.NumberofTravelers) { 
      toast("Please fill all the fields.")
      return;
    }
    // console.log(formData);
    const FINAL_PROMPT=AI_PROMPT
    .replace('{location}',formData?.location)
    .replace('{totalDays}',formData?.noOfdays)
    .replace('{traveler}',formData?.NumberofTravelers)
    .replace('{budget}',formData?.budget)
    .replace('{totalDays}',formData?.noOfdays)

    console.log(FINAL_PROMPT);

    const result=await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result?.response?.text());
  };
  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <h2 className="text-3xl font-bold">
        Tell us your travel preferences 🌴🏕️
      </h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>
      <div className="mt-20 flex flex-col gap-10">
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is the destination of choice?
          </h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                // console.log(v);  
                handleInputChange("location" , v?.label);
              },
            }}
          />
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days are you planning your trip?
          </h2>

          <Input
            placeholder={"Ex.3"}
            type={"number"}
            onChange={(e) => handleInputChange("noOfdays", e.target.value)}
          />
        </div>
      </div>

      <div>
        <h2 className="text-xl my-3 font-medium">
          What is Your Budget?
          <br />
          The budget is exclusively allocated for activities and dining
          purposes.
        </h2>
        <div className="grid grid-cols-3 mt-5 gap-5">
          {SelectBudgetOptions.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("budget", item.title)}
              className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
                  ${
                    formData.budget === item.title && "shadow-lg border-black"
                  }  
                `}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-gray-500 text-sm">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-20">
        <h2 className="text-xl my-3 font-medium">
          Who do you plan to travel with on your next adventure?
        </h2>
        <div className="grid grid-cols-3 mt-5 gap-5">
          {SelectTraveleroptions.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("NumberofTravelers", item.people)}
              className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
                ${
                  formData.NumberofTravelers === item.people &&
                  "shadow-lg border-black"
                }  
              `}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-gray-500 text-sm">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 items-center justify-center flex">
        <Button onClick={OnGenerateTrip}>Generate Trip</Button>
      </div>
    </div>
  );
}

export default CreateTrip;
