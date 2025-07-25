/*  ----------------------------------------------------------------------
    JEC Esports Club – Registration Form
    Fully integrated with EmailJS  (service_8sfi3dn / template_ps3gjvd)
----------------------------------------------------------------------- */

import React, { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";

/*  ✅  ShadCN-UI (or your own) components  */
import { Button }   from "@/components/ui/button";
import { Input }    from "@/components/ui/input";
import { Label }    from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

/* ----------  types  ---------- */
interface FormData {
  fullName:            string;
  collegeId:           string;
  courseYear:          string;
  instagram:           string;
  mobile:              string;
  games:               string[];
  otherGame:           string;
  mainRole:            string;
  gameUsernames:       string;
  competitiveLevel:    string;
  weekendAvailability: string;
  friends:             string;
}

/* ----------  constants  ---------- */
const gamesList  = ["BGMI", "Free Fire", "CODM"];
const rolesList  = [
  "IGL",
  "Entry Fragger",
  "Sniper",
  "Support",
  "All-rounder",
  "Casual / Content creator",
  "Manager / Organiser",
];
const compLevels = [
  "Very serious – I want to play and win tournaments",
  "I play regularly, looking for team",
  "Casual gamer, here for fun",
  "I'm more of a manager/creator",
];

/* =================================================================== */
const RegistrationForm: React.FC = () => {
  const { toast } = useToast();

  /*  Init EmailJS once  */
  useEffect(() => {
    emailjs.init("T7GrEXnRi8uB7bQjw");
  }, []);

  /*  local form state  */
  const [formData, setFormData] = useState<FormData>({
    fullName:            "",
    collegeId:           "",
    courseYear:          "",
    instagram:           "",
    mobile:              "",
    games:               [],
    otherGame:           "",
    mainRole:            "",
    gameUsernames:       "",
    competitiveLevel:    "",
    weekendAvailability: "",
    friends:             "",
  });

  const [loading, setLoading] = useState(false);

  /*  helpers  */
  const toggleGame = (game: string, checked: boolean) =>
    setFormData((p) => ({
      ...p,
      games: checked ? [...p.games, game] : p.games.filter((g) => g !== game),
    }));

  /* =============================================================== */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    /* basic required-field validation */
    if (
      !formData.fullName ||
      !formData.courseYear ||
      !formData.instagram ||
      !formData.mobile
    ) {
      toast({
        title: "Missing information",
        description: "Please fill all required fields.",
        variant: "destructive",
      });
      return;
    }
    if (formData.games.length === 0 && !formData.otherGame.trim()) {
      toast({
        title: "Select at least one game",
        variant: "destructive",
      });
      return;
    }

    /* ------------------------------------------------- */
    setLoading(true);

    /*  Build variables EXACTLY as declared in template  */
    const payload = {
      full_name:            formData.fullName,
      college_id:           formData.collegeId || "—",
      course_year:          formData.courseYear,
      instagram_username:   formData.instagram.startsWith("@")
                              ? formData.instagram
                              : "@" + formData.instagram,
      mobile_number:        formData.mobile,
      games:                [...formData.games, formData.otherGame]
                              .filter(Boolean)
                              .join(", "),
      main_role:            formData.mainRole || "—",
      game_usernames:       formData.gameUsernames || "—",
      competitive_level:    formData.competitiveLevel || "—",
      weekend_availability: formData.weekendAvailability || "—",
      friends_joining:      formData.friends || "—",
      time:                 new Date().toLocaleString("en-IN", {
                              timeZone: "Asia/Kolkata",
                              dateStyle: "medium",
                              timeStyle: "short",
                            }),
    };

    try {
      await emailjs.send(
        "service_8sfi3dn",   // Service ID
        "template_ps3gjvd",  // Template ID
        payload
      );

      toast({
        title: "Registration submitted 🎉",
        description: "Welcome to JEC Esports Club! We'll contact you soon.",
      });

      /* reset form */
      setFormData({
        fullName:            "",
        collegeId:           "",
        courseYear:          "",
        instagram:           "",
        mobile:              "",
        games:               [],
        otherGame:           "",
        mainRole:            "",
        gameUsernames:       "",
        competitiveLevel:    "",
        weekendAvailability: "",
        friends:             "",
      });
    } catch (err: any) {
      console.error(err);
      toast({
        title: "Failed to send",
        description: err?.text || err?.message || "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  /* ===========================  UI  ============================== */
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3533cd] via-[#1b1a6a] to-black p-6">
      <div className="container mx-auto max-w-2xl">
        {/* --------- Header / Logo ---------- */}
        <div className="text-center mb-10">
          <img
            src="/lovable-uploads/4d570b96-7284-4e65-a02a-885908c74741.png"
            alt="JEC Esports Club"
            className="h-28 mx-auto mb-4"
          />
          <h1 className="text-3xl md:text-4xl font-extrabold text-white">
            Join JEC Esports Club
          </h1>
          <p className="text-gray-300 mt-2">
            Ready to dominate the gaming arena? Register now!
          </p>
        </div>

        {/* -------------------- CARD -------------------- */}
        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-center text-2xl text-[#3533cd]">
              Registration Form
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">

              {/* ------------ PERSONAL INFO ------------- */}
              <section className="space-y-4">
                <InputBlock
                  id="fullName"
                  label="Full Name *"
                  value={formData.fullName}
                  onChange={(v) => setFormData((p) => ({ ...p, fullName: v }))}
                  required
                />
                <InputBlock
                  id="collegeId"
                  label="College ID / Roll Number"
                  value={formData.collegeId}
                  onChange={(v) => setFormData((p) => ({ ...p, collegeId: v }))}
                  placeholder="Optional but helpful"
                />
                <InputBlock
                  id="courseYear"
                  label="Course & Year *"
                  value={formData.courseYear}
                  onChange={(v) => setFormData((p) => ({ ...p, courseYear: v }))}
                  placeholder="e.g., B.Tech 1st Year"
                  required
                />
                <InputBlock
                  id="instagram"
                  label="Instagram ID / Username *"
                  value={formData.instagram}
                  onChange={(v) => setFormData((p) => ({ ...p, instagram: v }))}
                  placeholder="@your_username"
                  required
                />
                <InputBlock
                  id="mobile"
                  label="Mobile Number (WhatsApp) *"
                  type="tel"
                  value={formData.mobile}
                  onChange={(v) => setFormData((p) => ({ ...p, mobile: v }))}
                  placeholder="+91 98765 43210"
                  required
                />
              </section>

              {/* --------------- GAMES ------------------- */}
              <section className="space-y-4">
                <Label className="font-medium">Which game(s) do you play? *</Label>
                {gamesList.map((g) => (
                  <CheckRow
                    key={g}
                    id={g}
                    label={g}
                    checked={formData.games.includes(g)}
                    onCheckedChange={(c) => toggleGame(g, c as boolean)}
                  />
                ))}
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="otherGame"
                    checked={!!formData.otherGame.trim()}
                    onCheckedChange={(c) =>
                      !c && setFormData((p) => ({ ...p, otherGame: "" }))
                    }
                  />
                  <Input
                    placeholder="Others (specify)"
                    className="flex-1"
                    value={formData.otherGame}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, otherGame: e.target.value }))
                    }
                  />
                </div>
              </section>

              {/* --------------- ROLE -------------------- */}
              <section>
                <Label className="font-medium">Your main role</Label>
                <Select
                  value={formData.mainRole}
                  onValueChange={(v) => setFormData((p) => ({ ...p, mainRole: v }))}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    {rolesList.map((r) => (
                      <SelectItem key={r} value={r}>
                        {r}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </section>

              {/* --------------- USERNAMES -------------- */}
              <section>
                <Label className="font-medium">
                  In-game Username + ID (all games)
                </Label>
                <Textarea
                  rows={3}
                  placeholder="BGMI: Player#1234, FreeFire: 987654321"
                  className="mt-2"
                  value={formData.gameUsernames}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, gameUsernames: e.target.value }))
                  }
                />
              </section>

              {/* --------------- COMPETITIVE LVL -------- */}
              <section>
                <Label className="font-medium">How competitive are you?</Label>
                <RadioGroup
                  className="mt-2 space-y-2"
                  value={formData.competitiveLevel}
                  onValueChange={(v) =>
                    setFormData((p) => ({ ...p, competitiveLevel: v }))
                  }
                >
                  {compLevels.map((lvl) => (
                    <RadioRow key={lvl} id={lvl} label={lvl} />
                  ))}
                </RadioGroup>
              </section>

              {/* --------------- WEEKEND --------------- */}
              <section>
                <Label className="font-medium">
                  Available for scrims/tournaments on weekends?
                </Label>
                <RadioGroup
                  className="mt-2 flex gap-6"
                  value={formData.weekendAvailability}
                  onValueChange={(v) =>
                    setFormData((p) => ({ ...p, weekendAvailability: v }))
                  }
                >
                  {["Yes", "No", "Depends"].map((o) => (
                    <RadioRow key={o} id={o} label={o} inline />
                  ))}
                </RadioGroup>
              </section>

              {/* --------------- FRIENDS --------------- */}
              <InputBlock
                id="friends"
                label="Friends you're joining with (optional)"
                value={formData.friends}
                onChange={(v) => setFormData((p) => ({ ...p, friends: v }))}
              />

              {/* --------------- SUBMIT ---------------- */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#3533cd] hover:bg-[#2f2dbc] text-white py-6 text-lg font-bold"
              >
                {loading ? "Sending…" : "Join JEC Esports Club 🎮"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-gray-400 text-sm mt-6">
          🎮 Join the fastest-growing esports community on campus!
        </p>
      </div>
    </div>
  );
};

/*  ──────────── Helper mini-components ──────────── */

const InputBlock = ({
  id,
  label,
  required,
  ...rest
}: {
  id: string;
  label: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) => (
  <div>
    <Label htmlFor={id} className="font-medium">
      {label}
    </Label>
    <Input
      id={id}
      className="mt-1"
      required={required}
      onChange={(e) => rest.onChange(e.target.value)}
      value={rest.value}
      placeholder={rest.placeholder}
      type={rest.type || "text"}
    />
  </div>
);

const CheckRow = ({
  id,
  label,
  checked,
  onCheckedChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  onCheckedChange: (c: boolean | "indeterminate") => void;
}) => (
  <div className="flex items-center gap-2">
    <Checkbox id={id} checked={checked} onCheckedChange={onCheckedChange} />
    <Label htmlFor={id} className="text-sm">
      {label}
    </Label>
  </div>
);

const RadioRow = ({
  id,
  label,
  inline,
}: {
  id: string;
  label: string;
  inline?: boolean;
}) => (
  <div className={inline ? "flex items-center gap-2" : "flex items-center gap-2"}>
    <RadioGroupItem id={id} value={id} />
    <Label htmlFor={id} className="text-sm">
      {label}
    </Label>
  </div>
);

export default RegistrationForm;