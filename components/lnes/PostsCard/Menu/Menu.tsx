
import { formatNumberWithUnit } from "@/utils/formatNumber"
import { RiAlertLine, RiBookmarkFill, RiBookmarkLine, RiCheckboxMultipleBlankLine, RiEyeOffLine, RiMore2Fill, RiShareForwardBoxLine, RiSparkling2Line, RiThumbDownFill, RiThumbDownLine } from "react-icons/ri"
import { AnyPublication, PublicationReactionType, PublicationReportReason, useBookmarkToggle, useLogin, useReactionToggle, useReportPublication } from '@lens-protocol/react-web';
import Report from './Report'

export default function Menu({ pub }) {
    return (
        <>
            <div className="dropdown dropdown-end ">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle  btn-sm text-base-content/70 hover:text-base-content"><RiMore2Fill className="size-6 " /></div>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1]  w-52 p-2 shadow border">

                    <li>  <BookmarkToggle publication={pub} /> </li>
                    <li>  <DownvoteToggle publication={pub} /></li>
                    <li> <EyeOffToggle publication={pub} /> </li>
                    <li> <SparklingToggle publication={pub} /> </li>

                    <li className="my-1"></li>
                    <li> <CheckboxMultipleBlankToggle publication={pub} /> </li>
                    <li> <ShareForwardBoxToggle publication={pub} /> </li>

                    <li className="my-1"></li>
                    <li > <Report publication={pub} /></li>
                </ul>
            </div>
        </>
    )
}


/* 收藏 */
function BookmarkToggle({ publication }) {
    const { execute: toggle, loading } = useBookmarkToggle();
    return (
        <button onClick={() => toggle({ publication })} disabled={loading} className={`flex flex-row text-base-content `}>
            {publication.operations.hasBookmarked ? (
                <> <RiBookmarkFill className="size-6" /><span>取消收藏</span></>
            ) : (
                <> <RiBookmarkLine className="size-6" /><span>收藏</span></>
            )}
        </button>
    );
}

/* 差 */
function DownvoteToggle({ publication }) {
    const { execute: toggle, loading, error } = useReactionToggle();

    const toggleReaction = async () => {
        await toggle({
            reaction: PublicationReactionType.Downvote,
            publication: publication,
        });
    };



    return (
        <button
            onClick={toggleReaction}
            disabled={loading}
            className={`flex flex-row text-base-content ${publication.operations.hasDownvote ? ' text-amber-500' : ''}`}>
            {publication.operations.hasDownvote ? (
                <RiThumbDownFill className="size-6 " />
            ) : (
                <RiThumbDownLine className="size-6 " />
            )}

            {publication.operations.hasDownvote ? '取消反对' : '反对'}
        </button>
    )
}

/* 不感兴趣 */
function EyeOffToggle({ publication }) {
    return (
        <button /* onClick={} disabled={} */ className={`flex flex-row text-base-content `}>
          <RiEyeOffLine className="size-6" /><span>不感兴趣</span>
        </button>
    );
}
/* 推荐兴趣 */
function SparklingToggle({ publication }) {
    return (
        <button /* onClick={} disabled={} */ className={`flex flex-row text-base-content `}>
          <RiSparkling2Line className="size-6" /><span>推荐兴趣</span>
        </button>
    );
}
/* 复制文本 */
function CheckboxMultipleBlankToggle({ publication }) {
    return (
        <button /* onClick={} disabled={} */ className={`flex flex-row text-base-content `}>
          <RiCheckboxMultipleBlankLine className="size-6" /><span>复制文本</span>
        </button>
    );
}
/* 分享链接 */
function ShareForwardBoxToggle({ publication }) {
    return (
        <button /* onClick={} disabled={} */ className={`flex flex-row text-base-content `}>
          <RiShareForwardBoxLine className="size-6" /><span>分享链接</span>
        </button>
    );
}