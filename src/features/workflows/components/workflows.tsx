
'use client'
import { EmptyView, EntityContainer, EntityHeader, EntityList, EntityPagination, EntitySearch, ErrorView, LoadingView } from "@/components/entity-components"
import { useCreateWorkflow, useSuspenseWorkflows } from "../hooks/use-workflows"
import { useUpgradeModal } from "@/hooks/use-upgrade-modal"
import { useRouter } from "next/navigation"
import { useWorkflowsParams } from "../hooks/use-workflow-params"
import { useEntitySearch } from "@/hooks/use-entity-search"



export const WorkflowsSearch = () => {

  const [params, setParams] = useWorkflowsParams()

  const { searchValue, onSearchChange } = useEntitySearch({
    params,
    setParams
  })
  return (
    <EntitySearch
      value={searchValue}
      onChange={onSearchChange}
      placeholder="Search workflows"
    />
  );
};



export const WorkflowsList = () => {

  const workflows = useSuspenseWorkflows()

  // if(workflows.data.items.length === 0){
  //   return(
  //     <WorkflowEmpty />
  //   )
  // }

  // return (
  //   <div className="flex-1 flex
  //       justify-center items-center">
  //     <p>


  //       {JSON.stringify(workflows.data, null, 2)}
  //     </p>
  //   </div>
  // )


  return (
    <EntityList
      items={workflows.data.items}
      getKey={(workflow) => workflow.id}
      renderItem={(workflow) => <p>{workflow.name}</p>}
      emptyView={<WorkflowEmpty />}
    />
  )
}




export const WorkflowsHeader = ({ disabled }: { disabled?: boolean }) => {

  const createWorkflow = useCreateWorkflow();
  const router = useRouter();
  const { handleError, modal } = useUpgradeModal()

  const handleCreate = () => {
    createWorkflow.mutate(undefined, {
      onSuccess: (data) => {
        router.push(`/workflows/${data.id}`)
      },

      onError: (error) => {
        handleError(error)
      }
    })
  }
  return (
    <>
      {modal}
      <EntityHeader
        title="Workflows"
        description="Create and manage your workflows"
        onNew={handleCreate}
        newButtonLabel="New workflow"
        disabled={disabled}
        isCreating={createWorkflow.isPending}
      />


    </>
  );
};


export const WorkflowsPagination = () => {
  const workflows = useSuspenseWorkflows();
  const [params, setParams] = useWorkflowsParams();

  return (
    <EntityPagination
      page={workflows.data.page}
      totalPages={workflows.data.totalPages}
      onPageChange={(page) => setParams({ ...params, page })}
      disabled={workflows.isFetching}
    />
  )
}



export const WorkflowsContainer = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return (
    <EntityContainer
      header={<WorkflowsHeader />}
      search={<WorkflowsSearch />}
      pagination={<WorkflowsPagination />}
    >
      {children}
    </EntityContainer>
  );
};

export const WorkflowsLoading = () => {
  return <LoadingView message="Loading workflows..." />
};

export const WorkflowsError = () => {
  return <ErrorView message="Error loading workflows..." />
}



export const WorkflowEmpty = () => {
  const router = useRouter()
  const createWorkflow = useCreateWorkflow()
  const { handleError, modal } = useUpgradeModal()

  const handleCreate = () => {
    createWorkflow.mutate(undefined, {
      onError: (error) => {
        handleError(error);
      },
      onSuccess: (data) => {
        router.push(`/workflows/${data.id}`)
      }
    })
  }

  return (
    <>
      {modal}
      <EmptyView
        onNew={handleCreate}
        message="You haven't created any workflow yet or with that name. Get Started by creating your first workflow."
      />
    </>
  )
}