<script>
  import Basic from "./components/Basic.svelte";
  import BasicRefactored from "./components/BasicRefactored.svelte";
  import Conditional from "./components/Conditional.svelte";
  import BackendErrors from "./components/BackendErrors.svelte";
  import CustomValidationFunction from "./components/CustomValidationFunction.svelte";

  let activeTab = 4;
  let tabs = [
    {
      title: "Basic example",
      component: Basic,
    },
    {
      title: "Basic example improved",
      component: BasicRefactored,
    },
    {
      title: "Conditional validation example",
      component: Conditional,
    },
    {
      title: "Backend errors",
      component: BackendErrors,
    },
    {
      title: "Custom validation function",
      component: CustomValidationFunction,
    },
  ];

  const tabClickHandler = (e) => {
    activeTab = parseInt(e.target.getAttribute("data-i"));
  };
</script>

<main>
  <h1>Svelte Validation Examples</h1>

  <div class="tabs">
    {#each tabs as tab, i}
      <div
        class="tab"
        class:active={activeTab === i}
        on:click={tabClickHandler}
        data-i={i}>
        {tab.title}
      </div>
    {/each}
  </div>

  <h2>{tabs[activeTab].title}</h2>
  <svelte:component this={tabs[activeTab].component} />
</main>
