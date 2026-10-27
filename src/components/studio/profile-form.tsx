import { tr } from "@/lib/i18n/i18n";
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { CALLING_CODES, COUNTRIES } from "@/lib/cv/model";
import { useStudio } from "@/lib/cv/store";
import { CustomDetails } from "@/components/studio/custom-details";
import { SignatureSection } from "@/components/studio/signature-pad";
import { useT } from "@/lib/i18n/i18n";
import { Area, Button, Field, Panel, Select, TextInput } from "@/components/studio/ui";

// i18n-data:start
const LEVELS = ["Native", "C2", "C1", "B2", "B1", "A2", "A1"];
const SEXES = ["Female", "Male", "Unspecified"];
const MARITAL = ["Single", "Married", "Registered partnership", "Separated", "Divorced", "Widow(er)", "Other"];
const PASSPORTS = ["Ordinary", "Diplomatic", "Service", "Official", "Special", "Laissez-passer", "Refugee travel document", "Other"];
const ENDORSEMENTS = ["ECNR", "ECR", "Not applicable"];
const YES_NO = ["No", "Yes"];
// i18n-data:end

function readPhoto(file: File): Promise<string> {
  const url = URL.createObjectURL(file);
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      const max = 360;
      const scale = Math.min(1, max / Math.max(image.width, image.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(image.width * scale));
      canvas.height = Math.max(1, Math.round(image.height * scale));
      const context = canvas.getContext("2d");
      if (!context) {
        URL.revokeObjectURL(url);
        reject(new Error(tr("photo")));
        return;
      }
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      const photo = canvas.toDataURL("image/jpeg", 0.72);
      URL.revokeObjectURL(url);
      resolve(photo);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error(tr("photo")));
    };
    image.src = url;
  });
}

export function ProfileForm() {
  const t = useT();
  const personal = useStudio((state) => state.profile.personal);
  const experience = useStudio((state) => state.profile.experience);
  const education = useStudio((state) => state.profile.education);
  const languages = useStudio((state) => state.profile.languages);
  const certifications = useStudio((state) => state.profile.certifications);
  const skills = useStudio((state) => state.profile.skills);
  const children = useStudio((state) => state.profile.children);
  const travel = useStudio((state) => state.profile.travel);
  const patch = useStudio((state) => state.patchPersonal);
  const addExperience = useStudio((state) => state.addExperience);
  const updateExperience = useStudio((state) => state.updateExperience);
  const removeExperience = useStudio((state) => state.removeExperience);
  const addEducation = useStudio((state) => state.addEducation);
  const updateEducation = useStudio((state) => state.updateEducation);
  const removeEducation = useStudio((state) => state.removeEducation);
  const addLanguage = useStudio((state) => state.addLanguage);
  const updateLanguage = useStudio((state) => state.updateLanguage);
  const removeLanguage = useStudio((state) => state.removeLanguage);
  const addCertification = useStudio((state) => state.addCertification);
  const updateCertification = useStudio((state) => state.updateCertification);
  const removeCertification = useStudio((state) => state.removeCertification);
  const addSkill = useStudio((state) => state.addSkill);
  const removeSkill = useStudio((state) => state.removeSkill);
  const addChild = useStudio((state) => state.addChild);
  const updateChild = useStudio((state) => state.updateChild);
  const removeChild = useStudio((state) => state.removeChild);
  const addTrip = useStudio((state) => state.addTrip);
  const updateTrip = useStudio((state) => state.updateTrip);
  const removeTrip = useStudio((state) => state.removeTrip);
  const clearDossier = useStudio((state) => state.clearDossier);
  const [skill, setSkill] = useState("");
  const [armed, setArmed] = useState(false);

  const empty = !personal.givenName && !personal.familyName && experience.length === 0;

  return (
    <div className="flex flex-col gap-4">
      {empty ? (
        <p className="rounded-2xl border border-dashed border-brass bg-brass-soft px-4 py-3 text-sm">
          {tr("The desk is empty. Read a document above, or fill the sample dossier to see a finished page.")}
        </p>
      ) : null}

      <Panel title={tr("Identity")}>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label={tr("Given name")}>
            <TextInput value={personal.givenName} onChange={(event) => patch({ givenName: event.target.value })} />
          </Field>
          <Field label={tr("Family name")}>
            <TextInput value={personal.familyName} onChange={(event) => patch({ familyName: event.target.value })} />
          </Field>
          <div className="sm:col-span-2">
            <Field label={tr("Headline")} hint={tr("Occupation or target role. Shown under your name.")}>
              <TextInput
                value={personal.headline}
                onChange={(event) => patch({ headline: event.target.value })}
              />
            </Field>
          </div>
          <Field label={tr("Date of birth")}>
            <TextInput type="date" value={personal.dateOfBirth} onChange={(event) => patch({ dateOfBirth: event.target.value })} />
          </Field>
          <Field label={tr("Place of birth")}>
            <TextInput value={personal.placeOfBirth} onChange={(event) => patch({ placeOfBirth: event.target.value })} />
          </Field>
          <Field label={tr("Nationality")}>
            <TextInput value={personal.nationality} onChange={(event) => patch({ nationality: event.target.value })} />
          </Field>
        </div>
        <div className="mt-3">
          <Field label={tr("Photo")} hint={tr("Optional. Germany and the Gulf often expect a photo; leave it off for the US, UK and Canada.")}>
            <div className="flex items-center gap-3">
              {personal.photo ? (
                <img src={personal.photo} alt="" className="size-16 rounded-lg object-cover" />
              ) : (
                <span className="grid size-16 place-items-center rounded-lg border border-dashed border-line text-xs text-muted">{tr("None")}</span>
              )}
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  aria-label={tr("Optional photo")}
                  className="block w-full text-sm file:me-3 file:h-11 file:rounded-full file:border-0 file:bg-forest file:px-4 file:text-sm file:text-sheet"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    event.target.value = "";
                    if (!file) return;
                    void readPhoto(file).then((photo) => patch({ photo }));
                  }}
                />
                {personal.photo ? (
                  <button type="button" className="h-11 self-start text-sm text-muted" onClick={() => patch({ photo: "" })}>
                    {tr("Remove photo")}
                  </button>
                ) : null}
              </div>
            </div>
          </Field>
        </div>
        <div className="mt-3">
          <Field label={tr("Profile")}>
            <Area value={personal.summary} onChange={(event) => patch({ summary: event.target.value })} />
          </Field>
        </div>
      </Panel>

      <Panel title={tr("Passport")}>
        <p className="mb-3 text-sm text-muted">{tr("Schengen and visa forms ask for these options. Indian passports may also carry ECNR or ECR.")}</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label={tr("Type")}>
            <Select value={personal.passportType} onChange={(event) => patch({ passportType: event.target.value })}>
              <option value="">{tr("Choose")}</option>
              {PASSPORTS.map((item) => (
                <option key={item} value={item}>{tr(item)}</option>
              ))}
            </Select>
          </Field>
          <Field label={tr("Number")}>
            <TextInput value={personal.passportNumber} autoComplete="off" onChange={(event) => patch({ passportNumber: event.target.value })} />
          </Field>
          <Field label={tr("Issued")}>
            <TextInput type="date" value={personal.passportIssuedOn} onChange={(event) => patch({ passportIssuedOn: event.target.value })} />
          </Field>
          <Field label={tr("Expires")}>
            <TextInput type="date" value={personal.passportExpires} onChange={(event) => patch({ passportExpires: event.target.value })} />
          </Field>
          <Field label={tr("Issuing country")}>
            <Select value={personal.passportIssuedBy} onChange={(event) => patch({ passportIssuedBy: event.target.value })}>
              <option value="">{tr("Choose")}</option>
              {COUNTRIES.map((country) => (
                <option key={country}>{country}</option>
              ))}
            </Select>
          </Field>
          <Field label={tr("Issuing city")}>
            <TextInput value={personal.passportIssuedCity} placeholder={tr("Mumbai")} onChange={(event) => patch({ passportIssuedCity: event.target.value })} />
          </Field>
          <Field label={tr("Endorsement")}>
            <Select value={personal.passportEndorsement} onChange={(event) => patch({ passportEndorsement: event.target.value })}>
              <option value="">{tr("Choose")}</option>
              {ENDORSEMENTS.map((item) => (
                <option key={item} value={item}>{tr(item)}</option>
              ))}
            </Select>
          </Field>
          <Field label={tr("Lost or stolen")}>
            <Select value={personal.passportLost} onChange={(event) => patch({ passportLost: event.target.value })}>
              <option value="">{tr("Choose")}</option>
              {YES_NO.map((item) => (
                <option key={item} value={item}>{tr(item)}</option>
              ))}
            </Select>
          </Field>
          <div className="sm:col-span-2">
            <Field label={tr("Previous passport number")}>
              <TextInput value={personal.oldPassport} onChange={(event) => patch({ oldPassport: event.target.value })} />
            </Field>
          </div>
        </div>
      </Panel>

      <Panel title={tr("Contact")}>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label={tr("Email")}>
            <TextInput type="email" value={personal.email} onChange={(event) => patch({ email: event.target.value })} />
          </Field>
          <Field label={tr("Calling code")}>
            <Select value={personal.phoneCode} onChange={(event) => patch({ phoneCode: event.target.value })}>
              {CALLING_CODES.map((entry) => (
                <option key={entry.code} value={entry.code}>
                  {entry.label}
                </option>
              ))}
            </Select>
          </Field>
          <Field label={tr("Phone")}>
            <TextInput value={personal.phone} inputMode="tel" onChange={(event) => patch({ phone: event.target.value })} />
          </Field>
          <Field label={tr("Street")}>
            <TextInput value={personal.street} onChange={(event) => patch({ street: event.target.value })} />
          </Field>
          <Field label={tr("Postal code")}>
            <TextInput value={personal.postalCode} onChange={(event) => patch({ postalCode: event.target.value })} />
          </Field>
          <Field label={tr("City")}>
            <TextInput value={personal.city} onChange={(event) => patch({ city: event.target.value })} />
          </Field>
          <Field label={tr("Region")}>
            <TextInput value={personal.region} onChange={(event) => patch({ region: event.target.value })} />
          </Field>
          <Field label={tr("Country")}>
            <TextInput
              list="meridian-countries"
              value={personal.country}
              onChange={(event) => patch({ country: event.target.value })}
            />
          </Field>
          <datalist id="meridian-countries">
            {COUNTRIES.map((country) => (
              <option key={country} value={country} />
            ))}
          </datalist>
          <Field label={tr("LinkedIn")}>
            <TextInput value={personal.linkedin} onChange={(event) => patch({ linkedin: event.target.value })} />
          </Field>
          <Field label={tr("Website")}>
            <TextInput value={personal.website} onChange={(event) => patch({ website: event.target.value })} />
          </Field>
        </div>
      </Panel>

      <Panel
        title={tr("Work")}
        action={
          <Button type="button" tone="quiet" className="h-10 px-4" onClick={addExperience}>
            <Plus className="size-4" aria-hidden /> {tr("Add role")}
          </Button>
        }
      >
        {experience.length === 0 ? <p className="text-sm text-muted">{tr("No roles yet.")}</p> : null}
        <div className="flex flex-col gap-4">
          {experience.map((role, index) => (
            <article key={role.id} className="rounded-xl border border-line p-3">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-medium">Role {index + 1}</h3>
                <button type="button" className="grid size-11 place-items-center text-muted" onClick={() => removeExperience(role.id)} aria-label={`Remove role ${index + 1}`}>
                  <Trash2 className="size-4" />
                </button>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label={tr("Title")}>
                  <TextInput value={role.title} onChange={(event) => updateExperience(role.id, { title: event.target.value })} />
                </Field>
                <Field label={tr("Organization")}>
                  <TextInput value={role.organization} onChange={(event) => updateExperience(role.id, { organization: event.target.value })} />
                </Field>
                <Field label={tr("Location")}>
                  <TextInput value={role.location} onChange={(event) => updateExperience(role.id, { location: event.target.value })} />
                </Field>
                <Field label={tr("Start")}>
                  <TextInput type="month" value={role.start} onChange={(event) => updateExperience(role.id, { start: event.target.value })} />
                </Field>
                <Field label={tr("End")}>
                  <TextInput type="month" value={role.end} disabled={role.current} onChange={(event) => updateExperience(role.id, { end: event.target.value })} />
                </Field>
                <label className="flex h-11 items-center gap-2 self-end text-sm">
                  <input
                    type="checkbox"
                    checked={role.current}
                    onChange={(event) => updateExperience(role.id, { current: event.target.checked, end: event.target.checked ? "" : role.end })}
                  />
                  {tr("Current role")}
                </label>
              </div>
              <div className="mt-3">
                <Field label={tr("What changed")} hint={tr("One point per line.")}>
                  <Area value={role.summary} onChange={(event) => updateExperience(role.id, { summary: event.target.value })} />
                </Field>
              </div>
            </article>
          ))}
        </div>
      </Panel>

      <Panel
        title={tr("Education")}
        action={
          <Button type="button" tone="quiet" className="h-10 px-4" onClick={addEducation}>
            <Plus className="size-4" aria-hidden /> {tr("Add study")}
          </Button>
        }
      >
        {education.length === 0 ? <p className="text-sm text-muted">{tr("No study yet.")}</p> : null}
        <div className="flex flex-col gap-4">
          {education.map((item, index) => (
            <article key={item.id} className="rounded-xl border border-line p-3">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-medium">Study {index + 1}</h3>
                <button type="button" className="grid size-11 place-items-center text-muted" onClick={() => removeEducation(item.id)} aria-label={`Remove study ${index + 1}`}>
                  <Trash2 className="size-4" />
                </button>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label={tr("Qualification")}>
                  <TextInput value={item.qualification} onChange={(event) => updateEducation(item.id, { qualification: event.target.value })} />
                </Field>
                <Field label={tr("Field")}>
                  <TextInput value={item.field} onChange={(event) => updateEducation(item.id, { field: event.target.value })} />
                </Field>
                <Field label={tr("Institution")}>
                  <TextInput value={item.institution} onChange={(event) => updateEducation(item.id, { institution: event.target.value })} />
                </Field>
                <Field label={tr("Location")}>
                  <TextInput value={item.location} onChange={(event) => updateEducation(item.id, { location: event.target.value })} />
                </Field>
                <Field label={tr("Start year")}>
                  <TextInput value={item.start} onChange={(event) => updateEducation(item.id, { start: event.target.value })} />
                </Field>
                <Field label={tr("End year")}>
                  <TextInput value={item.end} onChange={(event) => updateEducation(item.id, { end: event.target.value })} />
                </Field>
              </div>
              <div className="mt-3">
                <Field label={tr("Notes")}>
                  <Area value={item.details} onChange={(event) => updateEducation(item.id, { details: event.target.value })} />
                </Field>
              </div>
            </article>
          ))}
        </div>
      </Panel>

      <Panel title={tr("International options")}>
        <p className="mb-3 text-sm text-muted">
          {tr("This list follows the Europass CV and Schengen / visa particulars. Fill only what your form asks for. Empty lines are not printed.")}
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label={tr("Sex")}>
            <Select value={personal.sex} onChange={(event) => patch({ sex: event.target.value })}>
              <option value="">{tr("Not stated")}</option>
              {SEXES.map((item) => (
                <option key={item} value={item}>{tr(item)}</option>
              ))}
            </Select>
          </Field>
          <Field label={tr("Marital status")}>
            <Select value={personal.maritalStatus} onChange={(event) => patch({ maritalStatus: event.target.value })}>
              <option value="">{tr("Not stated")}</option>
              {MARITAL.map((item) => (
                <option key={item} value={item}>{tr(item)}</option>
              ))}
            </Select>
          </Field>
          <Field label={tr("Surname at birth")}>
            <TextInput value={personal.surnameAtBirth} onChange={(event) => patch({ surnameAtBirth: event.target.value })} />
          </Field>
          <Field label={tr("Nationality at birth")}>
            <TextInput value={personal.nationalityAtBirth} onChange={(event) => patch({ nationalityAtBirth: event.target.value })} />
          </Field>
          <Field label={tr("Other nationalities")}>
            <TextInput value={personal.otherNationalities} onChange={(event) => patch({ otherNationalities: event.target.value })} />
          </Field>
          <Field label={tr("National ID number")}>
            <TextInput value={personal.nationalId} onChange={(event) => patch({ nationalId: event.target.value })} />
          </Field>
          <Field label={tr("Position applied for")} hint={tr("Europass header. The job title on the advert.")}>
            <TextInput value={personal.positionApplied} onChange={(event) => patch({ positionApplied: event.target.value })} />
          </Field>
          <Field label={tr("Driving licence")}>
            <TextInput value={personal.drivingLicence} placeholder={tr("B")} onChange={(event) => patch({ drivingLicence: event.target.value })} />
          </Field>
          <Field label={tr("Father")}>
            <TextInput value={personal.fatherName} onChange={(event) => patch({ fatherName: event.target.value })} />
          </Field>
          <Field label={tr("Mother")}>
            <TextInput value={personal.motherName} onChange={(event) => patch({ motherName: event.target.value })} />
          </Field>
          <Field label={tr("Spouse")}>
            <TextInput value={personal.spouseName} onChange={(event) => patch({ spouseName: event.target.value })} />
          </Field>
          <Field label={tr("Guardian")} hint={tr("For a minor: name, phone, nationality.")}>
            <TextInput value={personal.guardian} onChange={(event) => patch({ guardian: event.target.value })} />
          </Field>
          <Field label={tr("Eye colour")}>
            <TextInput value={personal.eyeColour} placeholder={tr("Brown")} onChange={(event) => patch({ eyeColour: event.target.value })} />
          </Field>
          <Field label={tr("Hair colour")}>
            <TextInput value={personal.hairColour} placeholder={tr("Black")} onChange={(event) => patch({ hairColour: event.target.value })} />
          </Field>
        </div>
        <div className="mt-3 grid gap-3">
          <Field label={tr("Digital skills")}>
            <Area value={personal.digitalSkills} onChange={(event) => patch({ digitalSkills: event.target.value })} />
          </Field>
          <Field label={tr("Projects")}>
            <Area value={personal.projects} onChange={(event) => patch({ projects: event.target.value })} />
          </Field>
          <Field label={tr("Publications")}>
            <Area value={personal.publications} onChange={(event) => patch({ publications: event.target.value })} />
          </Field>
          <Field label={tr("Volunteering")}>
            <Area value={personal.volunteering} onChange={(event) => patch({ volunteering: event.target.value })} />
          </Field>
          <Field label={tr("Memberships")}>
            <Area value={personal.memberships} onChange={(event) => patch({ memberships: event.target.value })} />
          </Field>
          <Field label={tr("References")}>
            <Area value={personal.referencesNote} placeholder={tr("Available on request")} onChange={(event) => patch({ referencesNote: event.target.value })} />
          </Field>
          <Field label={tr("Merit")} hint={tr("Distinction, rank, or award.")}>
            <Area value={personal.merit} onChange={(event) => patch({ merit: event.target.value })} />
          </Field>
          <Field label={tr("Hobbies")}>
            <Area value={personal.hobbies} onChange={(event) => patch({ hobbies: event.target.value })} />
          </Field>
        </div>
        <p className="mb-3 mt-4 text-sm font-medium">{tr("This trip")}</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label={tr("Purpose of travel")}>
            <TextInput value={personal.visaPurpose} placeholder={tr("Tourism, work, study")} onChange={(event) => patch({ visaPurpose: event.target.value })} />
          </Field>
          <Field label={tr("Destination")}>
            <TextInput value={personal.destination} onChange={(event) => patch({ destination: event.target.value })} />
          </Field>
          <Field label={tr("Entry")}>
            <TextInput type="date" value={personal.entryDate} onChange={(event) => patch({ entryDate: event.target.value })} />
          </Field>
          <Field label={tr("Exit")}>
            <TextInput type="date" value={personal.exitDate} onChange={(event) => patch({ exitDate: event.target.value })} />
          </Field>
          <Field label={tr("Accommodation")}>
            <TextInput value={personal.accommodation} onChange={(event) => patch({ accommodation: event.target.value })} />
          </Field>
          <Field label={tr("Costs paid by")}>
            <TextInput value={personal.sponsor} placeholder={tr("Yourself, employer, host")} onChange={(event) => patch({ sponsor: event.target.value })} />
          </Field>
          <div className="sm:col-span-2">
            <Field label={tr("Previous visa")}>
              <TextInput value={personal.previousVisa} placeholder={tr("No, or the sticker number")} onChange={(event) => patch({ previousVisa: event.target.value })} />
            </Field>
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-3">
          {children.map((child, index) => (
            <article key={child.id} className="rounded-xl border border-line p-3">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-medium">Child {index + 1}</h3>
                <button type="button" className="grid size-11 place-items-center text-muted" onClick={() => removeChild(child.id)} aria-label={`Remove child ${index + 1}`}>
                  <Trash2 className="size-4" />
                </button>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <Field label={tr("Name")}>
                  <TextInput value={child.name} onChange={(event) => updateChild(child.id, { name: event.target.value })} />
                </Field>
                <Field label={tr("Date of birth")}>
                  <TextInput type="date" value={child.dateOfBirth} onChange={(event) => updateChild(child.id, { dateOfBirth: event.target.value })} />
                </Field>
                <Field label={tr("Gender")}>
                  <TextInput value={child.gender} placeholder={tr("Daughter")} onChange={(event) => updateChild(child.id, { gender: event.target.value })} />
                </Field>
              </div>
            </article>
          ))}
          <Button type="button" tone="quiet" className="h-11 self-start px-4" onClick={addChild}>
            <Plus className="size-4" aria-hidden /> {tr("Add child")}
          </Button>
          {travel.map((trip, index) => (
            <article key={trip.id} className="rounded-xl border border-line p-3">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-medium">Travel {index + 1}</h3>
                <button type="button" className="grid size-11 place-items-center text-muted" onClick={() => removeTrip(trip.id)} aria-label={`Remove travel ${index + 1}`}>
                  <Trash2 className="size-4" />
                </button>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label={tr("Country")}>
                  <TextInput value={trip.country} onChange={(event) => updateTrip(trip.id, { country: event.target.value })} />
                </Field>
                <Field label={tr("Purpose")}>
                  <TextInput value={trip.purpose} placeholder={tr("Work or visit")} onChange={(event) => updateTrip(trip.id, { purpose: event.target.value })} />
                </Field>
                <Field label={tr("From")}>
                  <TextInput value={trip.from} placeholder="2019" onChange={(event) => updateTrip(trip.id, { from: event.target.value })} />
                </Field>
                <Field label={tr("To")}>
                  <TextInput value={trip.to} placeholder="2019" onChange={(event) => updateTrip(trip.id, { to: event.target.value })} />
                </Field>
              </div>
            </article>
          ))}
          <Button type="button" tone="quiet" className="h-11 self-start px-4" onClick={addTrip}>
            <Plus className="size-4" aria-hidden /> {tr("Add travel")}
          </Button>
        </div>
      </Panel>

      <Panel title={tr("Languages and skills")}>
        <div className="flex flex-col gap-4">
          {languages.map((item, index) => (
            <div key={item.id} className="grid gap-2 sm:grid-cols-2">
              <TextInput aria-label={`Language ${index + 1}`} value={item.name} onChange={(event) => updateLanguage(item.id, { name: event.target.value })} />
              <div className="flex gap-2">
                <Select aria-label={`Level ${index + 1}`} className="min-w-0 flex-1" value={item.level} onChange={(event) => updateLanguage(item.id, { level: event.target.value })}>
                  {LEVELS.map((level) => (
                    <option key={level} value={level}>{tr(level)}</option>
                  ))}
                </Select>
                <button type="button" className="grid size-11 shrink-0 place-items-center text-muted" onClick={() => removeLanguage(item.id)} aria-label={`Remove language ${index + 1}`}>
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          ))}
          <Button type="button" tone="quiet" className="h-11 self-start px-4" onClick={addLanguage}>
            <Plus className="size-4" aria-hidden /> {tr("Add language")}
          </Button>

          <Field label={tr("Skills")} hint={tr("Press Enter to add each skill.")}>
            <TextInput
              value={skill}
              placeholder={tr("Tariff design")}
              onChange={(event) => setSkill(event.target.value)}
              onKeyDown={(event) => {
                if (event.key !== "Enter") return;
                event.preventDefault();
                addSkill(skill);
                setSkill("");
              }}
            />
          </Field>
          <ul className="flex flex-wrap gap-2">
            {skills.map((item) => (
              <li key={item}>
                <button type="button" className="inline-flex h-11 items-center gap-2 rounded-full bg-brass-soft px-3 text-sm" onClick={() => removeSkill(item)}>
                  {item}
                  <span className="sr-only">Remove {item}</span>
                </button>
              </li>
            ))}
          </ul>

          {certifications.map((item, index) => (
            <div key={item.id} className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_6rem_2.75rem]">
              <TextInput aria-label={`Certificate ${index + 1}`} placeholder={tr("Certificate")} value={item.name} onChange={(event) => updateCertification(item.id, { name: event.target.value })} />
              <TextInput aria-label={`Issuer ${index + 1}`} placeholder={tr("Issuer")} value={item.issuer} onChange={(event) => updateCertification(item.id, { issuer: event.target.value })} />
              <TextInput aria-label={`Year ${index + 1}`} placeholder={tr("Year")} value={item.year} onChange={(event) => updateCertification(item.id, { year: event.target.value })} />
              <button type="button" className="grid size-11 place-items-center text-muted" onClick={() => removeCertification(item.id)} aria-label={`Remove certificate ${index + 1}`}>
                <Trash2 className="size-4" />
              </button>
            </div>
          ))}
          <Button type="button" tone="quiet" className="h-11 self-start px-4" onClick={addCertification}>
            <Plus className="size-4" aria-hidden /> {tr("Add certificate")}
          </Button>
        </div>
      </Panel>

      <Panel title={t("More details")}>
        <p className="-mt-2 mb-3 text-xs text-muted">{t("Anything else your CV or forms need. Add as many as you like.")}</p>
        <CustomDetails />
      </Panel>

      <Panel title={t("Signature")}>
        <p className="-mt-2 mb-3 text-xs text-muted">{t("Draw or upload your signature. It appears on the signature line of the CV and on form declarations.")}</p>
        <SignatureSection />
      </Panel>

      <div className="flex justify-end">
        {armed ? (
          <div className="flex gap-2">
            <Button type="button" tone="quiet" className="h-11" onClick={() => setArmed(false)}>
              {tr("Keep it")}
            </Button>
            <Button
              type="button"
              className="h-11"
              onClick={() => {
                clearDossier();
                setArmed(false);
              }}
            >
              {tr("Clear the dossier")}
            </Button>
          </div>
        ) : (
          <Button type="button" tone="ghost" className="h-11" onClick={() => setArmed(true)}>
            {tr("Clear the dossier")}
          </Button>
        )}
      </div>
    </div>
  );
}
