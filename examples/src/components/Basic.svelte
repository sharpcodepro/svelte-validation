<script>
  import SvelteValidator from "../../../index";
  import { usernameConstraints, passwordConstraints } from "../constraints";

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
    sv.reset();
    alert("Submitted form as it is valid");
  }
</script>

<div class="description">
  A super basic example. Just two fields and a button.
</div>

<form on:submit|preventDefault={submitForm}>
  <div class:valid={$sv.valid.username} class:invalid={$sv.invalid.username}>
    <input bind:value={username} type="text" placeholder="Email address" />
    {#if $sv.invalid.username}
      <div>{$sv.invalid.username}</div>
    {/if}
  </div>
  <div class:valid={$sv.valid.password} class:invalid={$sv.invalid.password}>
    <input bind:value={password} type="password" placeholder="Password" />
    {#if $sv.invalid.password}
      <div>{$sv.invalid.password}</div>
    {/if}
  </div>
  <div><button disabled={!$sv.isFormValid} type="submit">Login</button></div>
</form>
