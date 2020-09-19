<script>
  import SvelteValidator from "../../../index";
  import { usernameConstraints, passwordConstraints } from "../constraints";
  import FieldGroup from "./FieldGroup.svelte";
  import FieldErrors from "./FieldErrors.svelte";

  let username = "";
  let password = "";

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

  function submitForm() {
    sv.reset(true);
    alert("Submitted form as it is valid");
  }
</script>

<div class="description">
  In this example we refactor HTML into simple components. Observe how much
  easier validation has become. As a bonus we have reduced HTML markup as well.
</div>

<form on:submit|preventDefault={submitForm}>
  <FieldGroup fieldName="username" validator={$sv}>
    <input bind:value={username} type="text" placeholder="Email address" />
    <FieldErrors validator={$sv} />
  </FieldGroup>
  <FieldGroup fieldName="password" validator={$sv}>
    <input bind:value={password} type="password" placeholder="Password" />
    <FieldErrors validator={$sv} />
  </FieldGroup>
  <div><button disabled={!$sv.isFormValid} type="submit">Login</button></div>
</form>
