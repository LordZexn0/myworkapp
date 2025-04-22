import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { dashboardTool } from '@sanity/dashboard'
import { iframeWidget } from '@sanity/dashboard-widget-iframe-pane'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'myworkapp-studio',
  title: 'MyWorkApp Studio',
  projectId: '4amcra53',
  dataset: 'production',
  plugins: [
    deskTool(),
    structureTool(),
    visionTool(),
    dashboardTool({
      widgets: [
        {
          component: iframeWidget,
          options: {
            url: 'https://datastudio.google.com/embed/reporting/YOUR_REPORT_ID',
            title: 'Site Analytics',
            height: 600
          }
        }
      ]
    })
  ],
  schema: {
    types: schemaTypes,
  },
})
