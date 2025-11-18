'use client'

import { useState, useCallback, useEffect } from 'react';
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  type Node,
  type Edge,
  type NodeChange,
  type EdgeChange,
  type Connection,
  Background,
  Controls,
  type ColorMode,
  MiniMap,
  BackgroundVariant,
  Panel
} from '@xyflow/react';

import { ErrorView, LoadingView } from "@/components/entity-components"
import { useSuspenseWorkflow } from "@/features/workflows/hooks/use-workflows"
import { useTheme } from "next-themes";

import '@xyflow/react/dist/style.css';
import { nodeComponents } from '@/config/node-config';
import { AddNodeButton } from './add-node-button';
import { useSetAtom } from 'jotai';
import { editorAtom } from '../store/atoms';

// const initialNodes = [
//   { id: 'n1', position: { x: 0, y: 0 }, data: { label: 'Node 1' } },
//   { id: 'n2', position: { x: 0, y: 100 }, data: { label: 'Node 2' } },
// ];

// const initialEdges = [{ id: 'n1-n2', source: 'n1', target: 'n2',
//   animated: true
//  }];

export const EditorLoading = () => <LoadingView message="Loading editor..." />;
export const EditorError = () => <ErrorView message="Error loading editor" />;

export const Editor = ({ workflowId }: { workflowId: string }) => {
  const { data: workflow } = useSuspenseWorkflow(workflowId);


  const setEditor =  useSetAtom(editorAtom)

  const [nodes, setNodes] = useState<Node[]>(workflow.nodes);
  const [edges, setEdges] = useState<Edge[]>(workflow.edges);



  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nodesSnapshot) =>
        applyNodeChanges(changes, nodesSnapshot)
      ),
    []
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((edgesSnapshot) =>
        applyEdgeChanges(changes, edgesSnapshot)
      ),
    []
  );

  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((edgesSnapshot) =>
        addEdge(params, edgesSnapshot)
      ),
    []
  );




  // Here I am getting the users theme choice and populating the canva window with that,
  // It doesn't auto adapt from the websites theme
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);


  useEffect(() => {
    setMounted(true);
  }, []);

  const resolvedTheme =
    theme === "system" ? systemTheme : theme;
  const myTheme = resolvedTheme as ColorMode
  if (!mounted) return null;


  return (
    <div className="size-full">
      <ReactFlow
        colorMode={myTheme} 
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        nodeTypes={nodeComponents}
        proOptions={{
          hideAttribution: true
        }}
        defaultEdgeOptions={{type: 'bezier'}}
        onInit={setEditor}
        snapGrid={[10, 10]}
        // snapToGrid
        panOnScroll
        panOnDrag={false}
        selectionOnDrag
      >
        <Background variant={BackgroundVariant.Cross} />
        <Controls />
        <MiniMap />
        <Panel position='top-right'>
          <AddNodeButton />
        </Panel>
      </ReactFlow>
    </div>
  );
};
