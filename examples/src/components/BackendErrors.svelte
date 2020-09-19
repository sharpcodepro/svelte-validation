<script>
  import SvelteValidator from "../../../index";
  import { usernameConstraints, passwordConstraints } from "../constraints";
  import FieldGroup from "./FieldGroup.svelte";
  import FieldErrors from "./FieldErrors.svelte";
  import App from "../App.svelte";
  import Basic from "./Basic.svelte";
  import BasicRefactored from "./BasicRefactored.svelte";
  import Conditional from "./Conditional.svelte";

  let username = "";
  let password = "";
  let isWorking = false;

  const sv = SvelteValidator(
    () => {
      return {
        username,
        password,
      };
    },
    {
      username: usernameConstraints,
      password: passwordConstraints,
    }
  );

  const login = (u, p) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let ret = {};
        let errors = {};
        if (u !== "test@example.com") errors.username = "User not found";
        if (p !== "svelte") errors.password = "Password is not correct";
        if (Object.keys(errors).length > 0) ret.errors = errors;
        resolve(ret);
      }, 2000);
    });
  };

  async function submitForm() {
    sv.reset(true);
    isWorking = true;
    let res = await login(username, password);
    if (res.errors) {
      sv.setBackendErrors(res.errors);
    } else {
      alert("Logged in successfully...");
    }
    isWorking = false;
  }
</script>

<div class="description">
  A common requirement in modern applications is invokation of some sort of
  backend. Svelte Validation makes it super easy to combina front-end validation
  with backend errors.
</div>

<form on:submit|preventDefault={submitForm}>
  <FieldGroup fieldName="username" validator={$sv}>
    <input
      disabled={isWorking}
      bind:value={username}
      type="text"
      placeholder="Email address" />
    <FieldErrors validator={$sv} />
  </FieldGroup>
  <FieldGroup fieldName="password" validator={$sv}>
    <input
      disabled={isWorking}
      bind:value={password}
      type="password"
      placeholder="Password" />
    <FieldErrors validator={$sv} />
  </FieldGroup>
  <div>
    <button
      disabled={!$sv.isFormValid || isWorking}
      type="submit">{isWorking ? 'Submitting...' : 'Login'}</button>
  </div>
</form>
