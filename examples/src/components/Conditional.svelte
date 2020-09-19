<script>
  import SvelteValidator from "../../../index";
  import {
    usernameConstraints,
    passwordConstraints,
    phoneConstraints,
  } from "../constraints";
  import FieldGroup from "./FieldGroup.svelte";
  import FieldErrors from "./FieldErrors.svelte";

  let username = "";
  let password = "";
  let mobilePhone = "";
  let registerWith = "email";

  const sv = SvelteValidator(
    () => {
      return registerWith === "email"
        ? {
            username,
            password,
          }
        : {
            mobilePhone,
            password,
          };
    },
    {
      username: usernameConstraints,
      mobilePhone: phoneConstraints,
      password: passwordConstraints,
    }
  );

  function submitForm() {
    sv.reset(true);
    alert("Submitted form as it is valid");
  }
</script>

<div class="description">
  In this form a user can login wither eith an email address or a phone number.
  We can easily do conditional validation.
</div>

<form on:submit|preventDefault={submitForm}>
  <div style="margin-bottom:1rem">
    Register with: <input
      type="radio"
      id="withEmail"
      name="regwith"
      value="email"
      on:change={() => {
        registerWith = 'email';
      }}
      checked={registerWith === 'email'} />
    <label for="withEmail">email address</label>
    <input
      type="radio"
      id="withMobilePhone"
      name="regwith"
      value="mobilePhone"
      on:change={() => {
        registerWith = 'mobilePhone';
      }}
      checked={registerWith === 'mobilePhone'} />
    <label for="withMobilePhone">mobile phone</label>
  </div>

  {#if registerWith === 'email'}
    <FieldGroup fieldName="username" validator={$sv}>
      <input bind:value={username} type="text" placeholder="Email address" />
      <FieldErrors validator={$sv} />
    </FieldGroup>
  {:else}
    <FieldGroup fieldName="mobilePhone" validator={$sv}>
      <input bind:value={mobilePhone} type="text" placeholder="Mobile phone" />
      <FieldErrors validator={$sv} />
    </FieldGroup>
  {/if}
  <FieldGroup fieldName="password" validator={$sv}>
    <input bind:value={password} type="password" placeholder="Password" />
    <FieldErrors validator={$sv} />
  </FieldGroup>
  <div><button disabled={!$sv.isFormValid} type="submit">Login</button></div>
</form>
