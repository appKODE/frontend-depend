import React, { memo, MouseEventHandler, ReactNode } from 'react'
import styled, { useTheme } from 'styled-components'

import { PanelPosition } from '../../../../app/pathfinder'
import { CloseIcon } from '../../icons'
import {
  PanelBottomIcon,
  PanelLeftIcon,
  PanelRightIcon,
  PanelTopIcon,
} from '../../icons/panel-position-icons'

const Wrapper = styled.div`
  display: flex;
  padding: 10px 12px;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  flex-shrink: 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.panel.border};
`

const Title = styled.h1`
  flex: 1 1 auto;
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.5px;
  color: ${({ theme }) => theme.colors.panel.text};
`

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
`

const PositionButton = styled.button<{ $active: boolean }>`
  appearance: none;
  border: none;
  background: ${({ $active, theme }) =>
    $active ? theme.colors.panel.surface : 'transparent'};
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  min-width: 44px;
  min-height: 44px;
  transition: background 0.15s;

  &:hover {
    background: ${({ theme }) => theme.colors.panel.surface};
  }

  @media (min-width: 480px) {
    min-width: 32px;
    min-height: 32px;
  }
`

const CloseButton = styled.button`
  appearance: none;
  border: none;
  background: transparent;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  min-width: 44px;
  min-height: 44px;
  transition: background 0.15s;
  margin-left: 4px;

  &:hover {
    background: ${({ theme }) => theme.colors.panel.surface};
  }

  @media (min-width: 480px) {
    min-width: 32px;
    min-height: 32px;
  }
`

type PositionEntry = {
  value: PanelPosition
  Icon: React.ComponentType<{ size?: number; fill?: string }>
}

const POSITIONS: PositionEntry[] = [
  { value: 'bottom', Icon: PanelBottomIcon },
  { value: 'top', Icon: PanelTopIcon },
  { value: 'left', Icon: PanelLeftIcon },
  { value: 'right', Icon: PanelRightIcon },
]

type Props = {
  children: ReactNode
  onClose: MouseEventHandler<HTMLButtonElement>
  position: PanelPosition
  onChangePosition: (pos: PanelPosition) => void
}

export const Header = memo(
  ({ children, onClose, position, onChangePosition }: Props) => {
    const theme = useTheme()

    return (
      <Wrapper>
        <Title>{children}</Title>
        <Controls>
          {POSITIONS.map(({ value, Icon }) => (
            <PositionButton
              key={value}
              $active={position === value}
              onClick={() => onChangePosition(value)}
              title={`Dock to ${value}`}>
              <Icon
                size={14}
                fill={
                  position === value
                    ? theme.colors.panel.accent
                    : theme.colors.panel.textMuted
                }
              />
            </PositionButton>
          ))}
          <CloseButton onClick={onClose} title='Close'>
            <CloseIcon
              width={16}
              height={16}
              fill={theme.colors.panel.textMuted}
            />
          </CloseButton>
        </Controls>
      </Wrapper>
    )
  },
)

export default Header
