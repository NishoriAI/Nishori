'use client'

import type { NodeProps } from '@xyflow/react'
import { memo } from 'react'
import { PlaceholderNode } from '../react-flow/placeholder-node'
import { PlusIcon } from 'lucide-react'
import { WorkflowNode } from './workflow-node'





export const InitialNode = memo((props: NodeProps) => {
  return (
    <div>
      <WorkflowNode showToolbar={false}>
        <PlaceholderNode
          {...props}
        >
          <div className=' cursor-pointer flex items-center justify-center'>
            <PlusIcon className='size-4' />
          </div>
        </PlaceholderNode>
      </WorkflowNode>
    </div>
  )
})


InitialNode.displayName = "InitialNode"