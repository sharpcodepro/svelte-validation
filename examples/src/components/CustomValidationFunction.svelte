<script>
  import SvelteValidator from "../../../index";
  import { usernameConstraints, passwordConstraints } from "../constraints";
  import FieldGroup from "./FieldGroup.svelte";
  import FieldErrors from "./FieldErrors.svelte";

  let username = "";
  let password = "";

  const myValidationFunction = function (formValues, constraints) {
    let ret = {};
    if (formValues.username != "me@example.com")
      ret.username = "Username must be me@example.com";
    return ret;
  };

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
    },
    myValidationFunction
  );

  function submitForm() {
    sv.reset(true);
    alert("Submitted form as it is valid");
  }
</script>

<div class="description">
  In this example we will use a custom function instead of validate.js. This
  allows you to plug-in any validation library of your choice or create your
  own!
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
