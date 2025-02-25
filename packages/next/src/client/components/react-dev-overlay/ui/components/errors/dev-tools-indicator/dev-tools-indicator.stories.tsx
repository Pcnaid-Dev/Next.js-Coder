import type { Meta, StoryObj } from '@storybook/react'
import { DevToolsIndicator } from './dev-tools-indicator'
import { withShadowPortal } from '../../../storybook/with-shadow-portal'
import type { VersionInfo } from '../../../../../../../server/dev/parse-version-info'
import type { OverlayState } from '../../../../shared'

const meta: Meta<typeof DevToolsIndicator> = {
  component: DevToolsIndicator,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    position: {
      control: 'select',
      options: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
      defaultValue: 'bottom-left',
    },
  },
  decorators: [
    withShadowPortal,
    // Test for high z-index
    (Story) => (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background:
            'linear-gradient(135deg, rgba(230,240,255,0.8) 0%, rgba(200,220,255,0.6) 100%)',
        }}
      >
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof DevToolsIndicator>

// Mock version info for stories
const mockVersionInfo: VersionInfo = {
  installed: '15.1.2',
  staleness: 'stale-major',
}

const state: OverlayState = {
  routerType: 'app',
  nextId: 1,
  buildError: null,
  errors: [],
  refreshState: { type: 'idle' },
  disableDevIndicator: false,
  rootLayoutMissingTags: [],
  versionInfo: mockVersionInfo,
  notFound: false,
  staticIndicator: true,
  debugInfo: { devtoolsFrontendUrl: undefined },
}

export const StaticRoute: Story = {
  args: {
    errorCount: 0,
    state,
    setIsErrorOverlayOpen: () => {},
  },
}

export const DynamicRoute: Story = {
  args: {
    errorCount: 0,
    state: {
      ...state,
      staticIndicator: false,
    },
    setIsErrorOverlayOpen: () => {},
  },
}

export const SingleError: Story = {
  args: {
    errorCount: 1,
    state,
    setIsErrorOverlayOpen: () => {},
  },
}

export const MultipleErrors: Story = {
  args: {
    errorCount: 3,
    state,
    setIsErrorOverlayOpen: () => {},
  },
}
