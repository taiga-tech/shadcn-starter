import FacebookIcon from '@/svg/sns/facebook.svg'
import GitHubIcon from '@/svg/sns/github.svg'
import InstagramIcon from '@/svg/sns/instagram.svg'
import TikTokIcon from '@/svg/sns/tiktok.svg'
import XIcon from '@/svg/sns/x.svg'
import YouTubeIcon from '@/svg/sns/youtube.svg'

export const SNS = {
    facebook: {
        title: 'Facebook',
        href: 'https://www.facebook.com/profile.php?id=',
        icon: FacebookIcon,
        color: 'fill-blue-600',
    },
    youtube: {
        title: 'YouTube',
        href: 'https://youtube.com/@kuuhack',
        icon: YouTubeIcon,
        color: 'fill-red-600',
    },
    x: {
        title: 'X',
        href: 'https://x.com/kuuhack_inc/',
        icon: XIcon,
        color: 'fill-white',
    },
    instagram: {
        title: 'Instagram',
        href: 'https://www.instagram.com/kuuhack/',
        icon: InstagramIcon,
        color: 'fill-fuchsia-500',
    },
    tiktok: {
        title: 'TikTok',
        href: 'https://www.tiktok.com/@kuuhack/',
        icon: TikTokIcon,
        color: 'fill-white',
    },
    github: {
        title: 'GitHub',
        href: 'https://github.com/kuuhack/',
        icon: GitHubIcon,
        color: 'fill-white',
    },
}

export const SOCIALS = [SNS.github, SNS.x]
