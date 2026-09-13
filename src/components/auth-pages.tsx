import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Check, CircleAlert } from "lucide-react";
import { AuthFrame } from "./auth-frame";
import { FormField } from "./form-field";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";

const BuildStamp = ({ label }: { label: string }) => (
  <div className="border-y-2 border-foreground py-8">
    <div className="font-display text-5xl font-bold leading-none">{label}</div>
    <div className="mt-4 flex justify-between font-mono text-xs"><span>ACCESS REQUEST</span><span>01 / 01</span></div>
  </div>
);

export function RegisterPage() {
  const [sent, setSent] = useState(false);
  const [values, setValues] = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  function submit(event: FormEvent) {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (values.name.trim().length < 2) next.name = "Enter your full name.";
    if (!/^\S+@\S+\.\S+$/.test(values.email)) next.email = "Enter a valid email address.";
    if (values.password.length < 8) next.password = "Use at least 8 characters.";
    if (values.password !== values.confirm) next.confirm = "Passwords do not match.";
    setErrors(next);
    if (!Object.keys(next).length) setSent(true);
  }
  if (sent) return <AuthFrame index="ACCOUNT / CONFIRM" title="Confirm your email" summary="We sent a confirmation link to your email address. Open it before you log in." aside={<BuildStamp label="EMAIL PENDING" />}><div className="border-l-4 border-primary bg-card p-5"><p className="font-semibold">Your account request is recorded.</p><p className="mt-2 text-sm text-muted-foreground">This frontend preview does not send an actual email.</p></div><Button asChild variant="outline" className="mt-6 w-full"><Link to="/login">Return to log in</Link></Button></AuthFrame>;
  return <AuthFrame index="ACCOUNT / NEW" title="Create your account and start your first project" summary="One account holds your project briefs, build activity, credits, and deliveries." aside={<BuildStamp label="PROJECT 001" />}>
    <form onSubmit={submit} className="space-y-5" noValidate>
      <FormField label="Full name" name="name" autoComplete="name" value={values.name} error={errors.name} onChange={(e) => setValues({...values, name:e.target.value})} />
      <FormField label="Email" name="email" type="email" autoComplete="email" value={values.email} error={errors.email} onChange={(e) => setValues({...values, email:e.target.value})} />
      <FormField label="Password" name="password" type="password" autoComplete="new-password" value={values.password} error={errors.password} hint="8 characters minimum" onChange={(e) => setValues({...values, password:e.target.value})} />
      <FormField label="Confirm password" name="confirm" type="password" autoComplete="new-password" value={values.confirm} error={errors.confirm} hint="Must match your password" onChange={(e) => setValues({...values, confirm:e.target.value})} />
      <Button type="submit" className="w-full">Create my account <ArrowRight /></Button>
      <p className="text-sm text-muted-foreground">Already registered? <Link to="/login" className="font-semibold text-foreground underline">Log in</Link></p>
    </form>
  </AuthFrame>;
}

export function LoginPage() {
  const navigate = useNavigate(); const [error, setError] = useState("");
  function submit(e: FormEvent<HTMLFormElement>) { e.preventDefault(); const data = new FormData(e.currentTarget); if (!data.get("email") || !data.get("password")) setError("The email or password is incorrect."); else navigate({to:"/dashboard"}); }
  return <AuthFrame index="ACCOUNT / ACCESS" title="Continue to your workspace" summary="Open your active projects, credit balance, and delivery records." aside={<div className="space-y-5"><p className="font-mono text-xs">LAST BUILD SEQUENCE</p>{["Plan approved","Tests passed","Repository delivered"].map((x,i)=><div key={x} className="flex items-center gap-4 border-b border-foreground pb-3"><span className="font-mono text-xs">0{i+1}</span><Check className="size-4"/><span>{x}</span></div>)}</div>}>
    <form onSubmit={submit} className="space-y-5"><FormField label="Email" name="email" type="email" autoComplete="email"/><FormField label="Password" name="password" type="password" autoComplete="current-password"/>{error && <p role="alert" className="flex gap-2 text-sm text-destructive"><CircleAlert className="size-4 shrink-0"/>{error}</p>}<div className="flex items-center justify-between gap-4 text-sm"><label className="flex items-center gap-2"><Checkbox name="remember"/>Remember me</label><Link to="/forgot-password" className="font-semibold underline">Forgot password?</Link></div><Button className="w-full" type="submit">Open my workspace <ArrowRight/></Button><p className="text-sm text-muted-foreground">New to Zeruvo? <Link to="/register" className="font-semibold text-foreground underline">Create an account</Link></p></form>
  </AuthFrame>;
}

export function ForgotPasswordPage() {
  const [sent,setSent]=useState(false); return <AuthFrame index="ACCOUNT / RECOVERY" title={sent ? "Check your inbox" : "Reset your password"} summary={sent ? "If this email is registered, we sent a reset link. The message is the same for every request." : "Enter the email attached to your account. We will send one secure reset link."} aside={<BuildStamp label="RESET / 15 MIN" />}>{sent ? <><div className="border-l-4 border-primary bg-card p-5 text-sm">If this email is registered, we sent a reset link.</div><Button asChild variant="outline" className="mt-6 w-full"><Link to="/login">Return to log in</Link></Button></> : <form onSubmit={(e)=>{e.preventDefault();setSent(true)}} className="space-y-5"><FormField label="Email" name="email" type="email" required/><Button className="w-full" type="submit">Send reset link <ArrowRight/></Button><Link to="/login" className="block text-sm font-semibold underline">Return to log in</Link></form>}</AuthFrame>;
}

export function ResetPasswordPage() {
  const [state,setState]=useState<"checking"|"valid"|"expired"|"done">("checking"); const [password,setPassword]=useState(""); const [confirm,setConfirm]=useState("");
  useEffect(()=>{const id=window.setTimeout(()=>setState(new URLSearchParams(window.location.search).get("expired") === "1" ? "expired" : "valid"),700);return()=>window.clearTimeout(id)},[]);
  if(state==="checking") return <AuthFrame index="ACCOUNT / VERIFY" title="Checking your reset link" summary="We are verifying that this password reset request is valid." aside={<BuildStamp label="VERIFYING" />}><div className="h-1 w-full overflow-hidden bg-secondary"><div className="h-full w-2/3 bg-primary motion-safe:animate-pulse"/></div></AuthFrame>;
  if(state==="expired") return <AuthFrame index="ACCOUNT / EXPIRED" title="This reset link is no longer valid" summary="Reset links expire for security. Request a new link to continue." aside={<BuildStamp label="LINK EXPIRED" />}><Button asChild className="w-full"><Link to="/forgot-password">Send a new link</Link></Button></AuthFrame>;
  if(state==="done") return <AuthFrame index="ACCOUNT / UPDATED" title="Your password is updated" summary="Use your new password the next time you access Zeruvo." aside={<BuildStamp label="ACCESS RESTORED" />}><Button asChild className="w-full"><Link to="/login">Log in with new password</Link></Button></AuthFrame>;
  return <AuthFrame index="ACCOUNT / NEW KEY" title="Set a new password" summary="Choose a new password for your Zeruvo account." aside={<BuildStamp label="SECURE CHANGE" />}><form onSubmit={(e)=>{e.preventDefault();if(password.length>=8&&password===confirm)setState("done")}} className="space-y-5"><FormField label="New password" name="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} error={password.length>0&&password.length<8?"Use at least 8 characters.":undefined}/><FormField label="Confirm new password" name="confirm" type="password" value={confirm} onChange={e=>setConfirm(e.target.value)} error={confirm.length>0&&password!==confirm?"Passwords do not match.":undefined}/><Button className="w-full">Update my password</Button></form></AuthFrame>;
}

export function AdminLoginPage() {
  const [error,setError]=useState("");
  return <main className="min-h-screen bg-secondary p-4 sm:p-8"><div className="mx-auto min-h-[calc(100vh-4rem)] max-w-5xl border-4 border-double border-foreground bg-background p-5 sm:p-10"><div className="flex justify-between border-b-2 border-foreground pb-5"><span className="font-display text-xl font-bold">ZERUVO</span><span className="font-mono text-xs uppercase">Administrative area</span></div><div className="grid gap-12 py-14 lg:grid-cols-2"><section><p className="font-mono text-xs text-primary">AUTHORIZATION GATE / A-01</p><h1 className="mt-7 text-5xl font-bold leading-none">Administrative access only</h1><p className="mt-5 max-w-sm leading-7 text-muted-foreground">Credentials are checked against assigned administrative roles. Standard accounts are refused immediately.</p></section><form onSubmit={(e)=>{e.preventDefault();setError("This account does not have administrative access.")}} className="border-t-8 border-foreground bg-card p-6 sm:p-8"><div className="space-y-5"><FormField label="Administrative email" name="email" type="email" required/><FormField label="Password" name="password" type="password" required/>{error&&<p role="alert" className="border-l-4 border-destructive p-3 text-sm font-semibold text-destructive">{error}</p>}<Button className="w-full">Verify administrative access</Button><Link to="/" className="block text-sm font-semibold underline">Return to Zeruvo</Link></div></form></div></div></main>;
}