import classnames from 'classnames'
import Countdown from 'react-countdown'
import { StatBar } from '../stats/StatBar'
import { Histogram } from '../stats/Histogram'
import { GameStats, getStoredIsHighContrastMode } from '../../lib/localStorage'
import { shareStatus } from '../../lib/share'
import {
  yesterdaySolution,
  yesterdaySolutionIndex,
  solutionIndex,
  tomorrow,
} from '../../lib/words'
import { BaseModal } from './BaseModal'
import { t, JISHO_SEARCH_LINK } from '../../constants/strings'

export type shareStatusType = 'text' | 'clipboard' | 'tweet'

type Props = {
  isOpen: boolean
  handleClose: () => void
  guesses: string[]
  gameStats: GameStats
  isGameLost: boolean
  isGameWon: boolean
  handleShareToClipboard: () => void
  isHintMode: boolean
  isHardMode: boolean
  isDarkMode: boolean
  isHighContrastMode: boolean
  numberOfGuessesMade: number
}

export const StatsModal = ({
  isOpen,
  handleClose,
  guesses,
  gameStats,
  isGameLost,
  isGameWon,
  handleShareToClipboard,
  isHintMode,
  isHardMode,
  isDarkMode,
  isHighContrastMode,
  numberOfGuessesMade,
}: Props) => {
  const isHighContrast = getStoredIsHighContrastMode()

  const classNames = classnames(
    'mt-2 w-full rounded-md border border-transparent shadow-sm px-4 py-2 local-font text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-sm',
    {
      'bg-orange-500 hover:bg-orange-600 focus:ring-orange-400': isHighContrast,
      'bg-green-500 hover:bg-green-600 focus:ring-green-400': !isHighContrast,
    }
  )

  if (gameStats.totalGames <= 0) {
    return (
      <BaseModal
        title={t('SOLUTION_INDEX_TEXT', solutionIndex.toString())}
        isOpen={isOpen}
        handleClose={handleClose}
      >
        <h4 className="local-font text-base leading-6 font-medium text-gray-900 dark:text-gray-100">
          {t('STATISTICS_TITLE')}
        </h4>
        <StatBar gameStats={gameStats} />
      </BaseModal>
    )
  }
  return (
    <BaseModal
      title={t('SOLUTION_INDEX_TEXT', solutionIndex.toString())}
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <div className="flex gap-1 justify-center dark:text-white mx-1">
        <div>
          <h5>{t('NEW_WORD_TEXT')}</h5>
        </div>
        <div>
          <Countdown
            className="local-font text-baseline font-medium text-gray-900 dark:text-gray-100"
            date={tomorrow}
            daysInHours={true}
          />
        </div>
      </div>
      <div className="flex gap-1 justify-center text-sm dark:text-white mx-1">
        {t('YESTERDAY_CORRECT_WORD_MESSAGE', yesterdaySolutionIndex.toString())}
        <a
          className="underline text-sm text-gray-600 dark:text-gray-300 cursor-zoom-in"
          href={JISHO_SEARCH_LINK + yesterdaySolution}
          rel="noreferrer"
          target="_blank"
        >
          {yesterdaySolution}
        </a>
      </div>
      {(isGameLost || isGameWon) && (
        <div>
          <div className="mt-4 sm:mt-5 mb-1 dark:text-white mx-1">
            <textarea
              className="local-font text-xs w-full border-solid border-2 rounded bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-600"
              rows={5}
              value={shareStatus(
                'text',
                guesses,
                isGameLost,
                isHintMode,
                isHardMode,
                isDarkMode,
                isHighContrastMode,
                handleShareToClipboard
              )}
            />
          </div>
          <div className="mb-5 sm:mb-6 grid grid-cols-2 gap-3 dark:text-white mx-1">
            <div>
              <button
                type="button"
                className={classNames}
                onClick={() => {
                  shareStatus(
                    'clipboard',
                    guesses,
                    isGameLost,
                    isHintMode,
                    isHardMode,
                    isDarkMode,
                    isHighContrastMode,
                    handleShareToClipboard
                  )
                }}
              >
                {t('SHARE_TEXT')}
              </button>
            </div>
            <div>
              <button
                type="button"
                className={classNames}
                onClick={() => {
                  shareStatus(
                    'tweet',
                    guesses,
                    isGameLost,
                    isHintMode,
                    isHardMode,
                    isDarkMode,
                    isHighContrastMode,
                    handleShareToClipboard
                  )
                }}
              >
                {t('TWEET_TEXT')}
              </button>
            </div>
          </div>
        </div>
      )}
      <hr className="mt-4 mb-4" />
      <h4 className="local-font text-base leading-6 font-medium text-gray-900 dark:text-gray-100">
        {t('STATISTICS_TITLE')}
      </h4>
      <StatBar gameStats={gameStats} />
      <h4 className="local-font text-base leading-6 font-medium text-gray-900 dark:text-gray-100">
        {t('GUESS_DISTRIBUTION_TEXT')}
      </h4>
      <Histogram
        gameStats={gameStats}
        numberOfGuessesMade={numberOfGuessesMade}
      />
    </BaseModal>
  )
}
